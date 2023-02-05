import constants from "./constants";

export default function handleStorage(action: string, storageType: string, key?: string, item?: unknown) {
  const _storage = window[`${storageType}Storage` as keyof typeof window];

  switch (action) {
    case "set":
      _storage.setItem(key, JSON.stringify(item));
      break;

    case "get":
      return JSON.parse(_storage.getItem(key));

    case "remove":
      _storage.removeItem(key);
      break;

    case "clear":
      _storage.clear();
      break;

    default:
      console.error(`${action}${constants.STORAGE_ERROR}`);
  }
}
