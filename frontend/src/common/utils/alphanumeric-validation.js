export const checkIsAlphanumeric = (string) => {
  let regExAlphanumeric = /^[0-9a-zA-Z]+$/;
  return string.replace(/\s/g, '').match(regExAlphanumeric);
};
