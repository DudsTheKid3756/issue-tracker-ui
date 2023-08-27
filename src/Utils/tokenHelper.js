import handleStorage from "./storage";

const getToken = () => handleStorage("get", "session", "token") || null;
const setSession = (token) => handleStorage("set", "session", "token", token);
const removeSession = () => handleStorage("remove", "session", "token");

export { getToken, setSession, removeSession };
