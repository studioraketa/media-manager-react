import { useEffect, useState } from "react";

import { url, key } from "./configuration";

import serializeParams from "./querrySerialize";

/**
 * Get all libraries
 * @params object  {libraries: {name: "searchstring"}}
 * @returns {Object} statefull value in {loading, error, data} format
 */
const listLibraries = (...params) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const libraryParams = params.length ? "?" + serializeParams(params) : "";

      const response = await fetch(url + "/libraries" + libraryParams, {
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

    fetchData();
  }, []);

  return state;
};

export default listLibraries;
