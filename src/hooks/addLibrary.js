import { useState } from "react";

import { url, key } from "./configuration";

/**
 * Create library in raketa image API
 * @returns array with function to call the POST method, and statefull value in {loading, error, data} format
 */
const addLibrary = () => {
  const [data, setData] = useState({
    loading: false,
    error: null,
    data: [],
  });

  /**
   * Function to call the POST method to raketa image API
   * @param requestBody - object in format {library: { uid: "string",name: "string"}}
   * @returns array with function to call the POST method, and statefull value in {loading, error, data} format
   */
  const fetchCreateLibrary = async (requestBody) => {
    // validate input???

    setData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await fetch(url + "/libraries", {
      method: "POST",
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.message) {
      setData((prevState) => ({
        ...prevState,
        error: data.message,
      }));
    } else if (data) {
      setData((prevState) => ({
        loading: false,
        error: null,
        data: data,
      }));
    }
  };

  return [fetchCreateLibrary, data];
};

export default addLibrary;
