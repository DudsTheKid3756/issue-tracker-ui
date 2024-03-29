import {
  API_ERROR,
  BAD_REQUEST_ERROR,
  ISSUE_PATH,
  NEW_ISSUE_SUCCESS_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
} from "../utils/constants";
import httpHelper from "../utils/httpHelper";
import { toaster } from "../utils/toaster";

const getIssues = async (
  setIssues,
  toggleApiError,
  apiPath,
  setIsLoading,
  setIsDisabled,
  path = ""
) => {
  await httpHelper(`${ISSUE_PATH}${path}`, apiPath, "GET")
    .then((response) => {
      if (!response.ok) {
        throw new Error(API_ERROR);
      }
      return response.json();
    })
    .then((data) => {
      toggleApiError(false);
      setTimeout(() => {
        setIssues(data);
        setIsLoading(false);
        setIsDisabled(false);
      }, 3000);
    })
    .catch((error) => {
      setIsLoading(false);
      toggleApiError(true);
      console.error(error);
    });
};

const addIssue = async (newIssue, navigate, apiPath) => {
  await httpHelper(ISSUE_PATH, apiPath, "POST", newIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      toaster(NEW_ISSUE_SUCCESS_MESSAGE, "success");
      setTimeout(() => navigate("/issues", { state: apiPath }), 2000);
    })
    .catch((error) => console.error(error));
};

const updateIssue = async (
  issueId,
  updatedIssue,
  navigate,
  apiPath,
  reminderPosted
) => {
  await httpHelper(`${ISSUE_PATH}/${issueId}`, apiPath, "PUT", updatedIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      !reminderPosted ? toaster(UPDATE_SUCCESS_MESSAGE, "success") : null;
      setTimeout(() => navigate("/issues", { state: apiPath }), 2000);
    })
    .catch((error) => console.error(error));
};

const deleteIssue = async (issueId, apiPath, setIsDeleted) => {
  await httpHelper(`${ISSUE_PATH}/${issueId}`, apiPath, "DELETE")
    .then((response) => {
      if (!response.ok) {
        throw new Error(API_ERROR);
      }
      setIsDeleted(true);
      setTimeout(
        () => toaster(`Issue with id: ${issueId} deleted`, "success"),
        3500
      );
      return response;
    })
    .catch((error) => console.error(error));
};

export { getIssues, addIssue, updateIssue, deleteIssue };
