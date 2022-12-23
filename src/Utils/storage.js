const storeItem = (key, item, storageType) =>
  window[`${storageType}Storage`].setItem(key, JSON.stringify(item));

const getItem = (key, storageType) =>
  JSON.parse(window[`${storageType}Storage`].getItem(key));

const removeItem = (key, storageType) =>
  window[`${storageType}Storage`].removeItem(key);

const clearStorage = (storageType) => window[`${storageType}Storage`].clear();

export { storeItem, getItem, clearStorage, removeItem };
