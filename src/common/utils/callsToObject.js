export const callsToObject = (array, key) => {
  if (array.length > 0) {
    let obj = array.reduce(function (o, v, i) {
      array.forEach((value, k) => {
        if (value[key] != null) {
          value.logicalDirection = v.direction;
          o[value[key]] = value;
        }
      });
      return o;
    }, {});
    return obj;
  } else {
    return {};
  }
};
