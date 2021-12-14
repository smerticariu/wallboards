export const averageValue = (total, count, precision) => {
  precision = precision != null ? precision : 1;
  if (count > 0) {
    return Number((total / count).toFixed(precision));
  } else {
    return 0;
  }
};
