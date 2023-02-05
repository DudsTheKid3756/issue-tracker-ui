import constants from "../utils/constants";
import httpHelper from "../utils/httpHelper";
import { toaster } from "../utils/toaster";
import { Issue } from "../@types/Issue";

async function getIssues(
  setIssues: (arg0: Issue[]) => void,
  setApiError: (arg0: boolean) => void,
  apiPath: string,
  setIsLoading: (arg0: boolean) => void,
  setIsDisabled: (arg0: boolean) => void
) {
  setIsLoading(true);
  await httpHelper(constants.ISSUE_PATH, apiPath, "GET")
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

async function addIssue(
  newIssue: Issue,
  navigate: (arg0: string, arg1: { state: any }) => void,
  apiPath: string
) {
  await httpHelper(constants.ISSUE_PATH, apiPath, "POST", newIssue)
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
  issueId: number,
  updatedIssue: Issue,
  navigate: (arg0: string, arg1: { state: unknown }) => void,
  apiPath: string,
  reminderPosted: boolean
) {
  await httpHelper(
    `${constants.ISSUE_PATH}/${issueId}`,
    apiPath,
    "PUT",
    updatedIssue
  )
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

async function deleteIssue(
  issueId: number,
  apiPath: string,
  setIsDeleted: (arg0: boolean) => void
) {
  await httpHelper(`${constants.ISSUE_PATH}/${issueId}`, apiPath, "DELETE")
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
