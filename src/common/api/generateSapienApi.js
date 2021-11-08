export const generateSapienApi = orgQuery => {
  const env = process.env.REACT_APP_ENV;

  switch(env) {
    case 'LOCAL':
    case 'DEV':
    case 'QA':
      return orgQuery ? 'https://sapien-proxy.redmatter-qa01.pub/v1' : 'https://sapien-proxy.redmatter-qa01.pub/v1/organisation';    
    case 'STAGE':
      return orgQuery ? 'https://nbwallboardcache-stage.herokuapp.com/v1' : 'https://nbwallboardcache-stage.herokuapp.com/v1/organisation';
    default:
      // return orgQuery ? 'https://wbsapien.redmatter.com/v1' : 'https://wbsapien.redmatter.com/v1/organisation'; // do not delete
      return orgQuery ? 'https://sapien-proxy.redmatter-qa01.pub/v1' : 'https://sapien-proxy.redmatter-qa01.pub/v1/organisation'; 
  }
}