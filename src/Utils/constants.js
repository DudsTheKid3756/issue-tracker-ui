export default Object.freeze({
  BASE_URL: "https://localhost:7082",
  API_ERROR: "Could not connect to API. Try again later.",
  BLANK_ERROR: " field cannot be blank",
  INVALID_ERROR: " field is invalid",
  BAD_REQUEST_ERROR:
    "Unable to submit request. Please fix errors and submit again",
  NEW_ISSUE_SUCCESS_MESSAGE: "New Issue successfully added!",
  UPDATE_SUCCESS_MESSAGE: "Issue updated successfully!",
  ALPHANUMERIC_REGEX: /^([\d\w-'_,.][\s]*)+\s*$/,
  ALERT_OPTIONS: ["No alert", "Half hour", "1 hour", "1 day", "2 days"],
});
