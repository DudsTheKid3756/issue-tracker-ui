import constants from "../Utils/constants";
import httpHelper from "../Utils/httpHelper";
import { toaster } from "../Utils/toaster";

const getIssues = async (
  setIssues,
  setApiError,
  apiPath,
  setIsLoading,
  setIsDisabled
) => {
  setIsLoading(true);
  await httpHelper("issue", apiPath, "GET")
    .then((response) => {
      if (!response.ok) {
        throw new Error(constants.API_ERROR);
      }
      return response.json();
    })
    .then((data) => {
      setTimeout(() => {
        setIssues(data);
        setIsLoading(false);
        setIsDisabled(false);
      }, 3000);
    })
    .catch((error) => {
      setIsLoading(false);
      setApiError(true);
      console.error(error);
    });
};

const addIssue = async (newIssue, navigate, apiPath) => {
  await httpHelper("issue", apiPath, "POST", newIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      toaster(constants.NEW_ISSUE_SUCCESS_MESSAGE, "success");
      setTimeout(
        () => navigate("/", { state: apiPath }),
        2000
      );
    })
    .catch((error) => console.error(error));
};

const updateIssue = async (issueId, updatedIssue, navigate, apiPath) => {
  await httpHelper(`issue/${issueId}`, apiPath, "PUT", updatedIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      toaster(constants.UPDATE_SUCCESS_MESSAGE, "success");
      setTimeout(
        () => navigate("/", { state: apiPath }),
        2000
      );
    })
    .catch((error) => console.error(error));
};

const deleteIssue = async (issueId, apiPath, setIsDeleted) => {
  await httpHelper(`issue/${issueId}`, apiPath, "DELETE")
    .then((response) => {
      if (!response.ok) {
        throw new Error(constants.API_ERROR);
      }
      setIsDeleted(true);
      return response;
    })
    .catch((error) => console.error(error));
};

export { getIssues, addIssue, updateIssue, deleteIssue };
