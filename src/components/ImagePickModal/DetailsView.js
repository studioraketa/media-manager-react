import React, { useState, useEffect } from "react";

import updateImage from "../../hooks/updateImage";

import SelectLibrary from "./SelectLibrary";

import { Button, P } from "@raketa-cms/raketa-mir";

export default function DetailsView(props) {
  const {
    onChange,
    selectedImage,
    fetchedLibraries,
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
        <P>{selectedImage.name}</P>
        <P>{`${selectedImage.sizes.original.height} X ${selectedImage.sizes.original.width}`}</P>
        <P>image type TBD</P>
        <Button>Delete</Button>
        <input type="text" value={altText} onChange={handleAltTextChange} />
        <SelectLibrary
          selectedLibrary={selectedLibrary}
          setSelectedLibrary={setSelectedLibrary}
          fetchedLibraries={fetchedLibraries}
        />
        <Button onClick={handleUpdateImage}>Update Image</Button>
        <Button onClick={handleSelectImage}>Select Image</Button>
      </aside>
    ) : (
      <P>Please select image</P>
    );

  return <div> {displayContent} </div>;
}
