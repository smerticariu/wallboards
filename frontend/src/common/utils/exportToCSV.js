export const exportToCSV = (data, filaName) => {
  let csvContent = 'data:text/csv;charset=utf-8,' + data;
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.target = '_blank';
  link.setAttribute('download', filaName);
  const root = document.getElementById('root');
  root.appendChild(link);
  link.click();
  root.removeChild(link);
};
