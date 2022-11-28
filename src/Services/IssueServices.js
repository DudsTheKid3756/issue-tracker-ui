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

  setIsLoading(true);

  for (let i = 0; i < urls.length; i++) {
    await httpHelper("issue", urls.at(i)[1], "GET")
      .then((response) => (!response.ok ? new Error(constants.API_ERROR) : response.json()))
      .then((data) => {
        promises.set(urls.at(i)[0], data);
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
        throw error;
      });
  }

  const dotnet = promises.get("dotnet");
  const java = promises.get("java");
  console.log(dotnet, java);
  // const fullfilledPromise = ["dotnet", dotnet];

  // if (dotnet == null && java != null) fullfilledPromise = ["java", java];

  // storeItem("api", baseUrls[fullfilledPromise[0]]);
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
