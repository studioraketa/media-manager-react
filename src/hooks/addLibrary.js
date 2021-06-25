import { useEffect, useState } from "react";

import { url, key } from "./configuration";

const addLibrary = () => {
  const [data, setData] = useState({
    loading: false,
    error: null,
    data: [],
  });

  const fetchLibraries = async () => {
    setData((prevState) => ({
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

  useEffect(() => {
    fetchLibraries();
  }, []);

  return [fetchLibraries, data];
};

export default addLibrary;
