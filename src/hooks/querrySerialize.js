const serialize = (params) =>
  params
    .map(
      (pArray) =>
        encodeURIComponent(pArray[0]) + "=" + encodeURIComponent(pArray[1]),
    )
    .join("&");

const serializeParams = (param) => {
  const paramsArray = [];

  param.forEach((el) => {
    for (const key in el) {
      if (Array.isArray(el[key])) {
        const arrayQuerry = {};
        const nestedArray = serializeParams(el[key]);
        arrayQuerry[key] = [...nestedArray];
        paramsArray.push([`f[${Object.keys(el)}]`, arrayQuerry[key]]);
      } else {
        paramsArray.push([`f[${key}]`, el[key]]);
      }
    }
  });
  return serialize(paramsArray);
};

export default serializeParams;
