import { STORAGE_ERROR } from "./constants";

export default function handleStorage(action, storageType, key, item) {
  const _storage = window[`${storageType}Storage`];

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
      console.error(`${action}${STORAGE_ERROR}`);
  }
}
