import constants from "../utils/constants";
import httpHelper from "../utils/httpHelper";
import { toaster } from "../utils/toaster";

async function getIssues(
  setIssues,
  setApiError,
  apiPath,
  setIsLoading,
  setIsDisabled
) {
  setIsLoading(true);
  await httpHelper("/", apiPath, "GET")
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
}

async function addIssue(newIssue, navigate, apiPath) {
  await httpHelper("/", apiPath, "POST", newIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      toaster(constants.NEW_ISSUE_SUCCESS_MESSAGE, "success");
      setTimeout(() => navigate("/", { state: apiPath }), 2000);
    })
    .catch((error) => console.error(error));
}

async function updateIssue(
  issueId,
  updatedIssue,
  navigate,
  apiPath,
  reminderPosted
) {
  await httpHelper(`/${issueId}`, apiPath, "PUT", updatedIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      !reminderPosted
        ? toaster(constants.UPDATE_SUCCESS_MESSAGE, "success")
        : null;
      setTimeout(() => navigate("/", { state: apiPath }), 2000);
    })
    .catch((error) => console.error(error));
}

async function deleteIssue(issueId, apiPath, setIsDeleted) {
  await httpHelper(`/${issueId}`, apiPath, "DELETE")
    .then((response) => {
      if (!response.ok) {
        throw new Error(constants.API_ERROR);
      }
      setIsDeleted(true);
      setTimeout(
        () => toaster(`Issue with id: ${issueId} deleted`, "success"),
        3500
      );
      return response;
    })
    .catch((error) => console.error(error));
}

export { getIssues, addIssue, updateIssue, deleteIssue };
