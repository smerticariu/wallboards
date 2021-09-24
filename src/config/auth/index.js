const config = {
  domain: 'redmatter-qa01.eu.auth0.com',
  client_id: '40leAQozuSfAQGf52Lf4JBeY6QIXBvmc',
  redirect_uri: 'https://wallboards.heroku.com',
  audience: 'https://sapien-proxy.redmatter-qa01.pub/',
  scope: 'enduser:basic openid',
  response_type: 'id_token',
  cacheLocation: 'localstorage'
};

export default config;