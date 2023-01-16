import constants from "./constants";

function validateStrings(stringsObject) {
  const errors = {};
  const alphaRegex = RegExp(constants.ALPHANUMERIC_REGEX);
  Object.keys(stringsObject).forEach((k) => {
    const v = stringsObject[k];
    const fK = k[0].toUpperCase() + k.substring(1, k.length);
    if (v == "") errors[k] = fK + constants.BLANK_ERROR;
    else if (!alphaRegex.test(v)) errors[k] = fK + constants.INVALID_ERROR;
  });

  return errors;
}

export default validateStrings;
