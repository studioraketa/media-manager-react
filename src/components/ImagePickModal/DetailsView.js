import React, { useState, useEffect } from "react";

import LibrariesDropDown from "./LibrariesDropDown";

import { Button, P } from "@raketa-cms/raketa-mir";

export default function DetailsView(props) {
  const {
    selectedImage,
    selectedLibrary,
    setSelectedLibrary,
    fetchedLibraries,
  } = props;

  const imageAltText =
    selectedImage && selectedImage.name ? selectedImage.name : "";

  const [altText, setAltText] = useState(imageAltText);

  const handleAltTextChange = (ev) => {
    ev.preventDefault();
    setAltText(ev.target.value);
  };

  useEffect(() => {
    setAltText(imageAltText);
  }, [imageAltText]);

  const displayContent =
    selectedImage && selectedImage.name ? (
      <div>
        <image src={selectedImage.name} />
        <P>{selectedImage.name}</P>
        <P>{`${selectedImage.sizes.original.height} X ${selectedImage.sizes.original.width}`}</P>
        <P>image type TBD</P>
        <Button>Delete</Button>
        <input type="text" value={altText} onChange={handleAltTextChange} />
        <LibrariesDropDown
          selectedLibrary={selectedLibrary}
          setSelectedLibrary={setSelectedLibrary}
          fetchedLibraries={fetchedLibraries}
        />
        <Button>Update Image</Button>
        <Button>Select Image</Button>
      </div>
    ) : (
      <P>Please select image</P>
    );

  return <div> {displayContent} </div>;
}
