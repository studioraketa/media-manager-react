import React, { useState, useEffect } from "react";

import styled from "styled-components";

import updateImage from "../../../hooks/updateImage";

import SelectLibrary from "./SelectLibrary";

import { Label, Button, P } from "@raketa-cms/raketa-mir";

const DetailsViewWrapper = styled.div`
  max-width: 30%;
  min-width: 30%;
  display: inline-flex;
  background-color: ${(props) => props.theme.colors.gray};
`;

export default function DetailsView(props) {
  const {
    onChange,
    selectedImage,
    fetchedLibraries,
    handleDelete,
    setSelectedImage,
    closeModal,
  } = props;

  const imageAltText =
    selectedImage && selectedImage.name ? selectedImage.name : "";

  const [altText, setAltText] = useState(imageAltText);
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const [fetchData, data] = updateImage();

  const handleAltTextChange = (ev) => {
    ev.preventDefault();
    setAltText(ev.target.value);
  };

  useEffect(() => {
    setAltText(imageAltText);
    if (selectedImage) {
      setSelectedLibrary(selectedImage.library);
    }
  }, [imageAltText, selectedImage]);

  const handleSelectImage = (ev) => {
    ev.preventDefault();
    onChange(selectedImage);
    closeModal((prev) => !prev);
  };

  const handleUpdateImage = (ev) => {
    ev.preventDefault();
    const requestBody = {
      image: {
        library_uid: selectedLibrary.uid,
        settings: [{ key: "alt", value: altText }],
      },
    };
    fetchData(requestBody, selectedImage.id).then((res) => {
      setSelectedImage(res);
    });
  };

  const displayContent =
    selectedImage && selectedImage.name ? (
      <aside>
        <img src={selectedImage.urls.original} height="200px" width="200px" />
        <Label>{selectedImage.name}</Label>
        <Label>{`${selectedImage.sizes.original.height} X ${selectedImage.sizes.original.width}`}</Label>
        <Label>image type TBD</Label>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDelete}
          id={selectedImage.id}
        >
          Delete
        </Button>
        <input type="text" value={altText} onChange={handleAltTextChange} />
        <SelectLibrary
          selectedLibrary={selectedLibrary}
          setSelectedLibrary={setSelectedLibrary}
          fetchedLibraries={fetchedLibraries}
        />
        <Button type="button" variant="secondary" onClick={handleUpdateImage}>
          Update Image
        </Button>
        <Button type="button" variant="secondary" onClick={handleSelectImage}>
          Select Image
        </Button>
      </aside>
    ) : (
      <P>Please select image for details</P>
    );

  return <DetailsViewWrapper> {displayContent} </DetailsViewWrapper>;
}
