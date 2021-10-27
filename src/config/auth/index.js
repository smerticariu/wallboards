const config = {
  domain:"redmatter-qa01.eu.auth0.com",
  clientId:"40leAQozuSfAQGf52Lf4JBeY6QIXBvmc",
  redirectUri: process.env.REACT_APP_ENV === "LOCAL" ? "http://localhost:3000" : "https://wallboards.herokuapp.com/",
  audience:"https://sapien-proxy.redmatter-qa01.pub/",
  scope:"wallboards:admin",
  responseType:"id_token",
  cacheLocation:"localstorage",
}

export default config;