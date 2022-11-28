import constants from "./constants";

const httpHelper = async (uri, api, method, body) => {
  return await fetch(`${constants.BASE_URLS[api]}/${uri}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export default httpHelper;
