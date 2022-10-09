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
    .catch(() => setApiError(true));
};

const addIssue = async (newIssue, setIsFulfilled) => {
  await httpHelper("issue", "POST", newIssue)
    .then((response) => {
      if (!response.ok) {
        toaster(
          constants.BAD_REQUEST_ERROR,
          "error"
        );
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(() => {
      toaster(constants.SUCCESS_MESSAGE, "success");
      setIsFulfilled(true);
    })
    .catch(() => null);
};

export { getIssues, addIssue };
