import { useEffect, useState } from "react";

import { url, key } from "./configuration";

/**
 * Delete image from raketa image API
 * @returns array with function to call the DELETE method, and statefull value in {loading, error, data} format
 */
const deleteImage = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  /**
   * @async
   * @param {integer} imageId
   * @returns {Promise<string>} The data from the URL
   */
  const fetchDeleteImage = async (imageId) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const imageParam = imageId ? "/" + imageId : "";

    const response = await fetch(url + "/images" + imageParam, {
      method: "DELETE",
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

  return [fetchDeleteImage, state];
};

export default deleteImage;
