import { useEffect, useState } from "react";

import { url, key } from "./configuration";

/**
 * Update image with PUT method
 * @param {Object} formData the body of PUT request - object containing the new iamge data
 * @param {Integer} imageID id of the image to update
 * @returns {Object} {fetchdata, state} object
 */

const updateImage = (formData = null, imageID = "") => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const fetchUpdateImage = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await fetch(url + "/images" + imageID, {
      method: "PUT",
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
      body: formData,
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
    fetchUpdateImage();
  }, []);

  return [fetchUpdateImage, state];
};

export default updateImage;
