import handleStorage from "./storage";

const getToken = (): string | null => handleStorage("get", "session", "token") || null;
const setSession = (token: string | undefined): void => handleStorage("set", "session", "token", token);
const removeSession = (): void => handleStorage("remove", "session", "token");


export { getToken, setSession, removeSession };