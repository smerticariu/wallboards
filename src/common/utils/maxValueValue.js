export const maxValue = (array) => {
  if (array.length > 0) {
    return Math.max.apply(Math, array);
  } else {
    return 0;
  }
};
