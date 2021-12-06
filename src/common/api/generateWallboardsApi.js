export const generateWallboardsApi = () => {
  const env = process.env.REACT_APP_ENV;

  switch(env) {
    case 'LOCAL':
    case 'DEV':
    case 'QA':
      return 'https://wallboards-store.redmatter-qa01.pub/organisation';
    case 'STAGE':
      return 'https://wallboards-store.redmatter-stage.pub/organisation';
    default:
      // return 'https://wallboards-store.redmatter.pub/organisation'; // do not delete
      return 'https://wallboards-store.redmatter-qa01.pub/organisation';
  }
}