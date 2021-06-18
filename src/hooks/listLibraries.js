import { useEffect, useState } from "react";

import { url, key } from "./configuration";

const listLibraries = () => {
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

      const response = await fetch(url + "/libraries", {
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
