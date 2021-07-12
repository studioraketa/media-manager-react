import React, { useState, useEffect, Fragment } from "react";
import { ThemeProvider } from "styled-components";
import {
  P,
  PanelTitle,
  Button,
  Label,
  FormGroup,
  Modal,
  theme,
} from "@raketa-cms/raketa-mir";
import * as mir from "@raketa-cms/raketa-mir";
import singleImageByID from "./hooks/singleImageByID";
import styled from "styled-components";

import ImagePickModal from "./components/ImagePickModal/ImagePickModal";
import AltTextModal from "./components/AltTextModal";

const ImageWrapper = styled.div`
  margin-right: 16px;

  & > img {
    object-fit: contain;
    width: 100px;
    height: 100px;
    background-color: #ddd;
  }
`;

const ImageControl = styled.div`
  display: flex;
  margin: 16px;
`;

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
        <ImageControl>
          <ImageWrapper>
            <img
              src={value.urls.original}
              width={value.sizes.thumb.width}
              height={value.sizes.thumb.height}
            />
          </ImageWrapper>
          <FormGroup>
            <PanelTitle>{label}</PanelTitle>
            <Label>Alt: {value.name}</Label>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setChooseImageModal((prevState) => !prevState)}
            >
              Choose image...
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setAltTextModal((prevState) => !prevState)}
            >
              Alt text
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onChange({})}
            >
              X
            </Button>
          </FormGroup>
        </ImageControl>
      </>
    );

  return <ThemeProvider theme={theme}>{dataToDisplay}</ThemeProvider>;
};

export default ImagePicker;
