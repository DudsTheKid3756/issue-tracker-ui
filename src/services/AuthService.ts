import constants from "../utils/constants";
import httpHelper from "../utils/httpHelper";
import { toaster } from "../utils/toaster";
import { removeSession, setSession } from "../utils/tokenHelper";
import { SignUp } from "../@types/SignUp";
import { Login } from "../@types/Login";

async function signup(apiPath: string, signUpInfo: SignUp) {
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
}

async function signin(
  apiPath: string,
  loginInfo: Login,
  changeIsLoggedIn: (bool: boolean) => void
) {
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
      setTimeout(() => {
        const token = data.token;
        toaster("Successfully signed in!", "success");
        changeIsLoggedIn(true);
        setSession(token);
      }, 3000);
    })
    .catch((error) => {
      toaster(error, "error");
      console.error(error);
    });
}

export { signup, signin };
