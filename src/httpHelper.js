import constants from "./constants";

const httpHelper = async (uri, method, body) => {
  return await fetch(`${constants.BASE_URL}${uri}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export default httpHelper;
