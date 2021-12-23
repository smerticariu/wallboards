export const checkIsAlphanumeric = (string) => {
  let regExAlphanumeric = /^[0-9a-zA-Z-!?:`.;,_#'"@&]+$/;
  if(string) {
    return string.replace(/\s/g, '').match(regExAlphanumeric);
  } else return '';
};
