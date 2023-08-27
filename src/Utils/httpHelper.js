import { BASE_URLS } from "./constants";
import { getToken } from "./tokenHelper";

async function httpHelper(path, api, method, payload) {
  return await fetch(`${BASE_URLS[api]}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });
}

export default httpHelper;
