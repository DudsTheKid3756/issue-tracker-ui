import constants from "./constants";

const httpHelper = async (uri, api, method, body) => {
  return await fetch(`${api}/${uri}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export default httpHelper;
