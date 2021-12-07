const config = {
  domain:"redmatter-qa01.eu.auth0.com",
  clientId:"40leAQozuSfAQGf52Lf4JBeY6QIXBvmc",
  redirectUri: process.env.REACT_APP_ENV === "LOCAL" ? "http://localhost:3000" : window.location.host,
  scope:"wallboards:admin",
  audience:"https://sapien-proxy.redmatter-qa01.pub/",
  responseType:"id_token",
  cacheLocation:"localstorage",
  instanceUrl: process.env.REACT_APP_ENV === "LOCAL" ? 'https://natterbox-3c-dev-ed--c.visualforce.com' : window.location.host,
  envHost: process.env.REACT_APP_ENV === "LOCAL" ? "https://flightdeck.natterbox-qa01.net" : window?.WbConfig?.host || window.location.host,
}

export default config;