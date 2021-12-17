export const fixLandingScrollBar = () => {
  const toolbarHeight = document.querySelector('.c-toolbar').offsetHeight;
  const bannerHeight = document.querySelector('.c-banner').offsetHeight;
  const landingTable = document.querySelector('.c-landing-table');
  landingTable.style.height = `calc(100vh - ${bannerHeight + toolbarHeight + 30}px)`;
};
