const storeItem = (key, item) =>
  window.localStorage.setItem(key, JSON.stringify(item));

const getItem = (key) => JSON.parse(window.localStorage.getItem(key));

const storageClear = () => window.localStorage.clear();

export { storeItem, getItem, storageClear };
