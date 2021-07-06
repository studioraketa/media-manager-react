import React, { useState, useEffect, Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { P, PanelTitle, Button, Modal, theme } from "@raketa-cms/raketa-mir";
import * as mir from "@raketa-cms/raketa-mir";
import singleImageByID from "./hooks/singleImageByID";

import ImagePickModal from "./components/ImagePickModal";
import AltTextModal from "./components/AltTextModal";

const ImagePicker = (props) => {
  const [loadedImage, setLoadedImage] = useState({});
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chooseImageModal, setChooseImageModal] = useState(false);
  const [altTextModal, setAltTextModal] = useState(false);

  const label = props.label || "IMAGE";
  const value = props.label || loadedImage;

  // delete after onchange is fn is provided
  const customOnChange = (object) =>
    console.log("on change triggered with object:", object);
  const onChange = props.onChange || customOnChange;

  const { error, loading, data } = singleImageByID(7);

  useEffect(() => {
    if (loading !== isLoading) setIsLoading(loading);
    if (data) setLoadedImage(data);
    if (error) setFetchError(error);
  }, [data, loading, error]);

  const dataToDisplay =
    isLoading || !("urls" in value) ? (
      <P>future fancy loader</P>
    ) : (
      <>
        {altTextModal && (
          <AltTextModal
            setAltTextModal={setAltTextModal}
            value={value}
            onChange={onChange}
          />
        )}
        {chooseImageModal && (
          <ImagePickModal
            closeModal={setChooseImageModal}
            onChange={onChange}
          />
        )}
        <img
          src={value.urls.original}
          width={value.sizes.thumb.width}
          height={value.sizes.thumb.height}
        />
        <PanelTitle>{label}</PanelTitle>
        <P>Alt: {value.name}</P>
        <Button onClick={() => setAltTextModal((prevState) => !prevState)}>
          alt text
        </Button>
        <Button onClick={() => setChooseImageModal((prevState) => !prevState)}>
          choose img
        </Button>
        <Button>clear image</Button>
      </>
    );

  return <ThemeProvider theme={theme}>{dataToDisplay}</ThemeProvider>;
};

export default ImagePicker;
