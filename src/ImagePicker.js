import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { P, PanelTitle, Button, Modal, theme } from "@raketa-cms/raketa-mir";
import * as elements from "@raketa-cms/raketa-mir";
import { listImages } from "./hooks/listImages";

import ImagePickModal from "./components/ImagePickModal/ImagePickModal";

const ImagePicker = () => {
  const [altTextModal, setAltTextModal] = useState(false);
  const [chooseImageModal, setChooseImageModal] = useState(false);

  const editAltTextModal = altTextModal ? (
    <Modal>
      <P>Test Modal. This should change to form. Use separate component</P>
      <Button onClick={() => setAltTextModal((prevState) => !prevState)}>
        X
      </Button>
    </Modal>
  ) : null;

  const chooseImage = chooseImageModal ? <ImagePickModal /> : null;

  const data = listImages(10);
  console.log(data);

  return (
    <ThemeProvider theme={theme}>
      {editAltTextModal}
      {chooseImage}
      <img
        src="https://drscdn.500px.org/group_avatar/119/q%3D85_w%3D100_h%3D100/v2?webp=true&v=1444807087&sig=ebf04bc5e7c8cb87b9b145c471e985591309e4886b3243c0b1d653f830a23b31"
        width="100"
        height="100"
      />
      <PanelTitle>IMAGE</PanelTitle>
      <P>Alt: Very-long-image-title-here-666-slayer-and-tesni-picheta-999</P>
      <Button onClick={() => setAltTextModal((prevState) => !prevState)}>
        alt text
      </Button>
      <Button onClick={() => setChooseImageModal((prevState) => !prevState)}>
        choose img
      </Button>
    </ThemeProvider>
  );
};

export default ImagePicker;
