export const clearValues = (values) => {
  Object.keys(values).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});
};
