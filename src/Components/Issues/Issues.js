import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApiContext } from "../../contexts/ApiContext";
import { LoginContext } from "../../contexts/LoginContext";
import {
  deleteIssue,
  getIssues,
  updateIssue,
} from "../../services/IssueServices";
import constants from "../../utils/constants";
import { dateData, handleTimeout } from "../../utils/counterHelper";
import Signout from "../../utils/icons/Signout";
import handleNotification from "../../utils/notificationHelper";
import handleStorage from "../../utils/storage";
import { toaster } from "../../utils/toaster";
import { getToken, removeSession } from "../../utils/tokenHelper";
import CommentCollapse from "../CommentCollapse";
import ApiSelectComponent from "../forms/ApiSelectComponent";
import LoadingSpinner from "../LoadingSpinner";
import LoginPage from "../login/LoginPage";
import SortComponent from "../SortComponent";
import "./issues.css";
import IssuesList from "./IssuesList";

const Issues = () => {
  const { toggleApiPath, apiError, toggleApiError } = useContext(ApiContext);
  const { isLoggedIn, changeIsLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");
  const storedToken = getToken();
  const decodedToken = storedToken !== null ? jwtDecode(storedToken) : null;
  const userRole = () => {
    let role;
    try {
      role = decodedToken[constants.ROLE_KEY];
    } catch (e) {
      console.error("Error: JWT token invalid", e);
    }
    return role;
  };
  const sortOptions = constants.SORT_OPTIONS;

  const [issues, setIssues] = useState([]);
  const [sortBy, setSortBy] = useState(sortOptions.at(0));
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showComment, setShowComment] = useState({});
  const [reminderDeleted, setReminderDeleted] = useState(false);
  const [today, setToday] = useState(new Date());

  const resetToday = () => setToday(new Date());
  const collapseAllComments = () => setShowComment({});

  useEffect(() => {
    setIsDisabled(true);
    setIssues([]);
    setIsLoading(true);
    getIssues(
      setIssues,
      toggleApiError,
      apiPath,
      setIsLoading,
      setIsDisabled,
      `/user/${decodedToken?.[constants.USERNAME_KEY]}`
    );
    checkToken();
  }, [apiPath, isDeleted, reminderDeleted, isLoggedIn, setIsLoading]);

  useEffect(() => {
    handleTimeout(issues, apiError, resetToday);
  }, [issues]);

  function onSortChange(e) {
    const option = sortOptions.find((option) => option.text == e.target.value);
    setSortBy(option);
  }

  function checkToken() {
    if (decodedToken) {
      const tokenExpirationMs = decodedToken.exp;
      const currentTimeMs = (Date.now() / 1000).toFixed(0);
      if (tokenExpirationMs < currentTimeMs) {
        removeSession();
        changeIsLoggedIn(false);
      } else changeIsLoggedIn(true);
    }
  }

  function handleDelete(id) {
    deleteIssue(id, apiPath, setIsDeleted);
    setIsDeleted(false);
  }

  function toEdit(issue, reminder) {
    navigate(`/issues/edit/${issue.id}`, {
      state: { issue, reminder },
    });
  }

  function toggleComment(id) {
    setShowComment({ ...showComment, [id]: !showComment[id] });
  }

  function removeReminder(issue, reminderPosted, closeToast) {
    updateIssue(
      issue.id,
      { ...issue, ["reminder"]: null, ["hasReminder"]: false },
      navigate,
      apiPath,
      reminderPosted
    );
    closeToast();
    setTimeout(() => setReminderDeleted(true), 1000);
  }

  function logout() {
    removeSession();
    location.reload();
  }

  handleNotification(issues, dateData(today), removeReminder);

  return (
    <>
      <div className="page">
        {!isLoggedIn ? (
          <LoginPage />
        ) : (
          <>
            <div className="mb-10">
              <div className="row">
                <h1 className="ms-2 col">Issue Tracker</h1>
                <button
                  className="btn btn-primary me-3 col-3"
                  onClick={() => logout()}
                >
                  Logout <Signout style="ms-1" />
                </button>
              </div>
              <div className="row">
                <span className="ma-2 me-2 gap-1 col">
                  {userRole() !== "admin" ? null : (
                    <ApiSelectComponent
                      apiPath={apiPath}
                      toggleApiPath={toggleApiPath}
                    />
                  )}
                </span>
              </div>
              <div className="row">
                <button
                  className="btn btn-success m-3 col"
                  onClick={() => navigate("/issues/create")}
                  disabled={isDisabled}
                >
                  New Issue +
                </button>
              </div>
              {!isDisabled ? (
                <SortComponent onChange={onSortChange} options={sortOptions} />
              ) : null}
            </div>
            <div className="issues">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <span className="issuesContainer">
                  {issues.length > 0 ? (
                    <IssuesList
                      issues={issues}
                      sortBy={sortBy.sortBy}
                      showComment={showComment}
                      toggleComment={toggleComment}
                      toEdit={toEdit}
                      handleDelete={handleDelete}
                    />
                  ) : apiError ? (
                    <p className="noIssues">{constants.API_ERROR}</p>
                  ) : (
                    <p className="noIssues">
                      No issues to show. Add a new one!
                    </p>
                  )}
                  {apiError ? toaster(constants.API_ERROR, "error") : null}
                  <CommentCollapse
                    showComment={showComment}
                    collapseAllComments={collapseAllComments}
                  />
                </span>
              )}
            </div>
            <ToastContainer />
          </>
        )}
      </div>
    </>
  );
};

export default Issues;
