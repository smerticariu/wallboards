export const percentValue = (value, total, precision) => {
  precision = precision != null ? precision : 1;
  if (total > 0) {
    return Number(((value / total) * 100).toFixed(precision));
  } else {
    return 0;
  }
};
