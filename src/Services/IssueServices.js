import constants from "../Utils/constants";
import httpHelper from "../Utils/httpHelper";
import { toaster } from "../Utils/toaster";

const getIssues = async (
  setIssues,
  setApiError,
  index,
  setIsLoading,
  setIsDisabled
) => {
  setIsLoading(true);
  await httpHelper("issue", index, "GET")
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

const addIssue = async (newIssue, navigate, apiPathIndex) => {
  await httpHelper("issue", apiPathIndex, "POST", newIssue)
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
        () => navigate("/", { state: apiPathIndex }),
        2000
      );
    })
    .catch((error) => console.error(error));
};

const updateIssue = async (issueId, updatedIssue, navigate, apiPathIndex) => {
  await httpHelper(`issue/${issueId}`, apiPathIndex, "PUT", updatedIssue)
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
        () => navigate("/", { state: apiPathIndex }),
        2000
      );
    })
    .catch((error) => console.error(error));
};

const deleteIssue = async (issueId, setIsDeleted, apiPathIndex) => {
  await httpHelper(`issue/${issueId}`, apiPathIndex, "DELETE")
    .then((response) => {
      if (!response.ok) {
        throw new Error(constants.API_ERROR);
      }
      return response;
    })
    .then(() => setIsDeleted(true))
    .catch((error) => console.error(error));
};

export { getIssues, addIssue, updateIssue, deleteIssue };
