import constants from "../Utils/constants";
import httpHelper from "../Utils/httpHelper";
import { storeItem } from "../Utils/storage";
import { toaster } from "../Utils/toaster";

const getIssues = async (
  setIssues,
  toggleApiError,
  setIsLoading,
  setIsDisabled
) => {
  const baseUrls = constants.BASE_URLS;
  const urls = Object.entries(baseUrls);
  const promises = new Map();

  for (let i = 0; i < Object.length(urls); i++) {
    setIsLoading(true);
    await httpHelper("issue", urls.at(i)[1], "GET").then((response) => {
      promises.set(urls.at(i)[0], !response.ok ? null : response.json());
    });
  }

  const dotnet = promises.get("dotnet");
  const java = promises.get("java");
  const fullfilledPromise = ["dotnet", dotnet];

  if (dotnet == null && java != null) fullfilledPromise = ["java", java];

  storeItem("api", baseUrls[fullfilledPromise[0]]);

  fullfilledPromise[1]
    .then((data) => {
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
      setTimeout(() => navigate("/", { state: apiPath }), 2000);
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
      setTimeout(() => navigate("/", { state: apiPath }), 2000);
    })
    .catch((error) => console.error(error));
};

const deleteIssue = async (issueId, setIsDeleted, apiPath) => {
  await httpHelper(`issue/${issueId}`, apiPath, "DELETE")
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
