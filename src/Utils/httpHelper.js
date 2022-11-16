import constants from "./constants";

const httpHelper = async (uri, apiIndex, method, body) => {
  return await fetch(`${constants.BASE_URL[apiIndex]}/${uri}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export default httpHelper;
