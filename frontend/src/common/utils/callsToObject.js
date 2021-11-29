export const callsToObject = (array, key) => {
  if (array.length > 0) {
    var obj = array.reduce(function (o, v, i) {
      array.forEach((value, k) => {
        if (value[key] != null) {
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
