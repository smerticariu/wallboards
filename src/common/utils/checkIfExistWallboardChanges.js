const checkIfExistWallboardChanges = (activeWallboard, activeWallboardInitialValues) => {
  return Object.keys(activeWallboard).some((key) => {
    if (key === 'widgets') {
      if (activeWallboard.widgets.length !== activeWallboardInitialValues.widgets.length) return true;
      return activeWallboard.widgets.some((_, index) => {
        return JSON.stringify(activeWallboard.widgets[index]) !== JSON.stringify(activeWallboardInitialValues.widgets[index]);
      });
    }
    if (activeWallboardInitialValues[key] !== activeWallboard[key]) {
      return true;
    }
    return false;
  });
};
export default checkIfExistWallboardChanges;
