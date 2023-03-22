import { sortColors } from "./colorSorter";

export const orderedList = (list, sortBy) => {
  "use strict";
  const fieldSorter = (fields) => (objA, objB) =>
    fields
      .map((field) => {
        let dir = 1;
        if (field[0] === "-") {
          dir = -1;
          field = field.substring(1);
        }

        const valueA = objA[field];
        const valueB = objB[field];

        return valueA > valueB ? dir : valueA < valueB ? -dir : 0;
      })
      .reduce((prevValue, currValue) => (prevValue ? prevValue : currValue), 0);

  if (sortBy.includes("-color")) {
    return sortColors(list);
  }
  
  return list.sort(fieldSorter(sortBy));
};
