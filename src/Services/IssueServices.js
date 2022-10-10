import constants from "../Utils/constants";
import httpHelper from "../Utils/httpHelper";
import toaster from "../Utils/toaster";

const getIssues = async (setIssues, setApiError, setIsDisabled) => {
  await httpHelper("issue", "GET")
    .then((response) => {
      if (!response.ok) {
        throw new Error(constants.API_ERROR);
      }
      return response.json();
    })
    .then((data) => {
      setIssues(data);
      setIsDisabled(false);
    })
    .catch((error) => {
      setApiError(true);
      console.error(error);
    });
};

const addIssue = async (newIssue, navigate) => {
  await httpHelper("issue", "POST", newIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.BAD_REQUEST_ERROR, "error");
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      toaster(constants.SUCCESS_MESSAGE, "success");
      setTimeout(() => navigate("/"), 2000);
    })
    .catch((error) => console.error(error));
};

const deleteIssue = async (issueId) => {
  await httpHelper(`issue/${issueId}`, "DELETE")
    .then((response) => {
      if (!response.ok) {
        throw new Error(constants.API_ERROR);
      }
      return response;
    })
    .catch((error) => console.error(error));
};

export { getIssues, addIssue, deleteIssue };
