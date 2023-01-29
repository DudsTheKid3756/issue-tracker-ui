import constants from "./constants";

async function httpHelper(path, api, method, payload, token) {
  return await fetch(`${constants.BASE_URLS[api]}/issue${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
}

export default httpHelper;
