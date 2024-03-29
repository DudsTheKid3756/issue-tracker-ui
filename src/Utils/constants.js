module.exports = Object.freeze({
  BASE_URLS: {
    dotnet: "https://localhost:7082/api",
    springboot: "http://localhost:8080/api",
  },
  ISSUE_PATH: "/issue",
  AUTH_PATH: "/auth",
  ROLE_KEY: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  USERNAME_KEY: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  API_ERROR: "Could not connect to API. Try again later.",
  BLANK_ERROR: " field cannot be blank",
  INVALID_ERROR: " field is invalid",
  BAD_REQUEST_ERROR:
    "Unable to submit request. Please fix errors and submit again",
  NEW_ISSUE_SUCCESS_MESSAGE: "New Issue successfully added!",
  UPDATE_SUCCESS_MESSAGE: "Issue updated successfully!",
  REGEX_OPTIONS: [{ type: "string", regex: /^([\d\w-'/&_,.][\s]*)+\s*$/ }],
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
  SORT_OPTIONS: [
    { text: "Newest", sortBy: ["-id"] },
    { text: "Oldest", sortBy: ["id"] },
    { text: "A to Z", sortBy: ["title"] },
    { text: "Z to A", sortBy: ["-title"] },
    { text: "Completed", sortBy: ["-isCompleted"] },
    { text: "Incomplete", sortBy: ["isCompleted"] },
    { text: "Color", sortBy: ["-color"] },
  ],
  EMAIL_REQUEST_OPTIONS: {
    serviceID: "service_p17yenv",
    templateID: "template_0gj60g8",
    publicKey: "Rp-fNzeGqmdJVKdT8",
  },
  COLORS: new Set([
    "#eb144c", // red
    "#ff6900", // orange
    "#fcb900", // yellow
    "#7bdcb5", // lite green
    "#00d084", // green
    "#8ed1fc", // lite blue
    "#0693e3", // blue
    "#9900ef", // purple
    "#f78da7", // pink
    "#abb8c3", // gray
  ]),
});
