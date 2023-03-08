import { BLANK_ERROR, INVALID_ERROR, REGEX_OPTIONS } from "./constants";

function getRegex(type) {
  const regexArr = REGEX_OPTIONS;
  var o = regexArr.find((o) => o.type == type);
  return RegExp(o.regex);
}

function validate(object) {
  const errors = {};
  Object.keys(object).forEach((k) => {
    const v = object[k];
    const regex = getRegex(typeof v);
    const fK = k[0].toUpperCase() + k.substring(1, k.length);
    if (v == "") errors[k] = fK + BLANK_ERROR;
    else if (!regex.test(v)) errors[k] = fK + INVALID_ERROR;
  });

  return errors;
}

export default validate;
