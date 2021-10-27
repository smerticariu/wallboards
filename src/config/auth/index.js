const config = {
  domain:"redmatter-qa01.eu.auth0.com",
  clientId:"40leAQozuSfAQGf52Lf4JBeY6QIXBvmc",
  redirectUri:"http://wallboards.herokuapp.com/",
  // redirectUri:"http://localhost:3000",
  audience:"https://sapien-proxy.redmatter-qa01.pub/",
  scope:"wallboards:admin",
  responseType:"id_token",
  cacheLocation:"localstorage",
}

export default config;