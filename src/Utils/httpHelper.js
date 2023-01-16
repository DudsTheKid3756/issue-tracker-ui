import constants from "./constants";

async function httpHelper(path, api, method, body) {
  return await fetch(`${constants.BASE_URLS[api]}/issue${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export default httpHelper;
