import { useState } from "react";

import { url, key } from "./configuration";

const uploadImage = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  /**
   * Update image with PUT method
   * @async
   * @param {File} file image to be uplaoded
   * @param {Object} requestBody with info about the image properties
   * @returns {Promise<string>} The data from the URL
   */
  const fetchUploadImage = async (file, requestBody = null) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const postForm = new FormData();
    postForm.append("image", file);

    const response = await fetch(url + "/images", {
      method: "POST",
      headers: {
        Authorization: key,
      },
      body: postForm,
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

  return [fetchUploadImage, state];
};

export default uploadImage;
