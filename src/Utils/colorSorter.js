import { COLORS } from "./constants";

export const sortColors = (objList) => {
  const colors = Array.from([...COLORS.values(), "#000000"]);

  return objList.sort(
    (objA, objB) => colors.indexOf(objA.color) - colors.indexOf(objB.color)
  );
};
