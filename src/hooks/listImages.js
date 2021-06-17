import { useEffect, useState } from "react";

import { url, key } from "./configuration";

const listImages = (imageId = null) => {
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

      const imageParam = imageId ? "/" + imageId : "";

      const response = await fetch(url + "/images" + imageParam, {
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

export { listImages };
