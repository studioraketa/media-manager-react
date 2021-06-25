const serialize = (params) =>
  params
    .map(
      (pArray) =>
        encodeURIComponent(pArray[0]) + "=" + encodeURIComponent(pArray[1]),
    )
    .join("&");

/**
 *
 * @param {Array} param multiple objects, or array of objects. Each object can cotnain values as array of objects, for example {settings: [{alt: "alttext"}, {key: "value"}]}
 * @returns {String} serialized Querry string
 */
const serializeParams = (param) => {
  const paramsArray = [];

  param.forEach((el) => {
    console.log(el);
    for (const key in el) {
      // handle nested arrays of objects
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
  // serailize all collected keys and values from the passed params
  return serialize(paramsArray);
};

export default serializeParams;
