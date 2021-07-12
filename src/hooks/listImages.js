import { useEffect, useState } from "react";

import { url, key } from "./configuration";

import serializeParams from "./querrySerialize";

/**
 * Get all images
 * @params object with key - the search param(name, library, etc.) and value the search string. Works with nested objects with multiple params
 * @returns {Object} statefull value in {loading, error, data} format
 */
const listImages = (...params) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const imageParams = params.length ? "?" + serializeParams(params) : "";

  const fetchData = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await fetch(url + "/images" + imageParams, {
      method: "GET",
      headers: {
        Authorization: key,
      },
    });

    const data = await response.json();
    if (data.message) {
      setState((prevState) => ({
        ...prevState,
        error: data.message,
      }));
    } else if (data) {
      setState((prevState) => ({
        loading: false,
        error: null,
        data: data,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [imageParams]);

  return state;
};

export default listImages;
