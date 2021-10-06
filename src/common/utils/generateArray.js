export const createArrayFromTo = (start, end) => {
  return Array(end - start + 1)
    .fill(undefined)
    .map((_, idx) => start + idx);
};
