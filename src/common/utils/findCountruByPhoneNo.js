import { COUNTRY_CODE } from '../defaults/wallboards.defaults';

export const findCountruByPhoneNo = (number) => {
  let i = 0;
  if (number.length < 8) return '( - )';
  while (COUNTRY_CODE[i]) {
    if (
      number.replace(/\s/g, '').indexOf(COUNTRY_CODE[i].dial_code?.replace(/\s/g, '')) === 0 ||
      ('+' + number).replace(/\s/g, '').indexOf(COUNTRY_CODE[i].dial_code?.replace(/\s/g, '')) === 0
    ) {
      break;
    }
    i++;
  }
  if (COUNTRY_CODE[i]) {
    return `( ${COUNTRY_CODE[i].code} )`;
  }
  return '( - )';
};
