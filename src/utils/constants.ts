export default Object.freeze({
  BASE_URLS: <{ [key: string]: string }>{
    dotnet: "https://localhost:7082/api",
    java: "http://localhost:8080/api",
  },
  ISSUE_PATH: "/issue",
  AUTH_PATH: "/auth",
  ROLE_KEY: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  API_ERROR: "Could not connect to API. Try again later.",
  BLANK_ERROR: " field cannot be blank",
  INVALID_ERROR: " field is invalid",
  BAD_REQUEST_ERROR:
    "Unable to submit request. Please fix errors and submit again",
  NEW_ISSUE_SUCCESS_MESSAGE: "New Issue successfully added!",
  UPDATE_SUCCESS_MESSAGE: "Issue updated successfully!",
  ALPHANUMERIC_REGEX: /^([\d\w-'_,.][\s]*)+\s*$/,
  ALERT_OPTIONS: [
    { text: "No alert", duration: null },
    { text: "On time", duration: 0 },
    { text: "Half hour", duration: 30 },
    { text: "1 hour", duration: 60 },
    { text: "1 day", duration: 1440 },
    { text: "2 days", duration: 2880 },
  ],
  INITIAL_REMINDER: {
    date: "",
    time: "",
    alert: "",
  },
  STORAGE_ERROR:
    ' not a valid storage action. Try "set, get, remove, or clear"',
});
