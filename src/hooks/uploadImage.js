import { useEffect, useState } from "react";

import { url, key } from "./configuration";

const uplaodImage = (formData = null) => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const postForm = new FormData();

  const fetchUploadImage = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await fetch(url + "/images" + imageParam, {
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

  useEffect(() => {
    fetchUploadImage();
  }, []);

  return [fetchUploadImage, state];
};

export default uplaodImage;
