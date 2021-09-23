import { Base64 } from 'js-base64';

const jwtExtractor = (token) => {
  if (!token) { return {}; }
  const s = token.split('.');
  const details = Base64.decode(s[1]);
  const data = JSON.parse(details);

  return ({
    expiry: data.exp,
    natterboxEmail: data['https://natterbox.com/claim/email'],
    natterboxUsername: data['https://natterbox.com/claim/username'],
    natterboxOrgId: data['https://natterbox.com/claim/orgId'],
    natterboxUserId: data['https://natterbox.com/claim/userId'],
    sapienEmail: data['https://sapien/email'],
    sapienUsername: data['https://sapien/username'],
    sapienOrgId: data['https://sapien/orgId'],
    sapienUserId: data['https://sapien/userId'],
    salesforceRestUrl: data['https://natterbox.com/claim/salesforce/restUrl'].replace('{version}', '42.0'),
    salesforceAccessToken: data['https://natterbox.com/claim/salesforce/accessToken'],
  });
};

export default jwtExtractor;
