import { useState } from "react";

import { url, key } from "./configuration";

/**
 * Update image with PUT method
 * @returns {Array} [fetchdata, state] arrey
 */
const updateLibrary = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  /**
   * Update image with PUT method
   * @async
   * @param {Object} requestBody the body of PUT request - object containing the new library data
   * @param {Integer} libraryID id of the library to update
   * @returns {Promise<string>} The data from the URL
   */
  const fetchUpdateLibrary = async (requestBody = {}, libraryID = "") => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await fetch(url + "/libraries/" + libraryID, {
      method: "PUT",
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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

  return [fetchUpdateLibrary, state];
};

export default updateLibrary;
