import constants from "./constants";
import { getToken } from "./tokenHelper";

async function httpHelper(path: string, api: string, method: string, payload?: unknown) {
  return await fetch(`${constants.BASE_URLS[api]}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload),
  });
}

export default httpHelper;
