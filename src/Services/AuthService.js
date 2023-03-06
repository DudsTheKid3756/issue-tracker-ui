import emailjs from "@emailjs/browser";
import constants from "../utils/constants";
import httpHelper from "../utils/httpHelper";
import { toaster } from "../utils/toaster";
import { removeSession, setSession } from "../utils/tokenHelper";

const signup = async (apiPath, signUpInfo) => {
  await httpHelper(`${constants.AUTH_PATH}/signup`, apiPath, "POST", signUpInfo)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.API_ERROR, "error");
        throw new Error(constants.API_ERROR);
      }
      return response.json();
    })
    .then(() => toaster("New user signed up successfully!", "success"))
    .catch((error) => {
      toaster(error, "error");
      console.error(error);
    });
};

const signin = async (apiPath, loginInfo, changeIsLoggedIn) => {
  await httpHelper(`${constants.AUTH_PATH}/signin`, apiPath, "POST", loginInfo)
    .then((response) => {
      if (!response.ok) {
        toaster(constants.API_ERROR, "error");
        throw new Error(constants.API_ERROR);
      }
      return response.json();
    })
    .then((data) => {
      removeSession();
      const token = data.token;
      toaster("Successfully signed in!", "success");
      setSession(token);
      setTimeout(() => changeIsLoggedIn(true), 1500);
    })
    .catch((error) => {
      toaster(error, "error");
      console.error(error);
      changeIsLoggedIn(false);
    });
};

const resetPassword = async (apiPath, passResetInfo, resetResponse) => {
  await httpHelper(
    `${constants.AUTH_PATH}/reset-pass`,
    apiPath,
    "PUT",
    passResetInfo
  )
    .then((response) => {
      if (!response.ok) {
        toaster(constants.API_ERROR, "error");
        throw new Error(constants.API_ERROR);
      }
      return response.json();
    })
    .then((data) => (resetResponse.current = data.message))
    .catch((error) => toaster(error, "error"));
};

const handleEmail = async (username, resetCode, apiPath, setEmail) => {
  const { serviceID, templateID, publicKey } = constants.EMAIL_REQUEST_OPTIONS;

  await httpHelper(`${constants.AUTH_PATH}/user/${username}`, apiPath, "GET")
    .then((response) => {
      if (!response.ok) {
        toaster(constants.API_ERROR, "error");
        throw new Error(constants.API_ERROR);
      }
      return response.json();
    })
    .then((data) => {
      setEmail(data.email);
      emailjs.send(
        serviceID,
        templateID,
        {
          to_email: data.email,
          to_name: username,
          from_name: "Issue Tracker Password Reset",
          reset_code: resetCode,
        },
        publicKey
      );
    })
    .catch((error) => toaster(error, "error"));
};

export { signup, signin, resetPassword, handleEmail };
