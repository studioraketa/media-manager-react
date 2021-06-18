import { useEffect, useState } from "react";

import { url, key } from "./configuration";

const addLibrary = (reqBody) => {
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

      const demoBody = { library: { uid: "demo-uid", name: "DemoLibrary" } };

      const response = await fetch(url + "/libraries", {
        method: "POST",
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(demoBody),
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
  console.log(state);

  return state;
};

export default addLibrary;
