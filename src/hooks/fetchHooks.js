import { useEffect, useState } from "react";

import { url, key } from "./configuration";

const listImages = () => {
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

      const response = await fetch(url + "/images", {
        method: "GET",
        headers: {
          Authorization: key,
        },
      });

      const data = await response.json();
      setState((prevState) => ({
        loading: false,
        error: null,
        data: data,
      }));

      // handle Error once i get familair with the API
    };

    fetchData();
  }, []);

  return state;
};

export { listImages };
