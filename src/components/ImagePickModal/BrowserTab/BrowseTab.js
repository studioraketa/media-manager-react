import React, { useState, useEffect } from "react";

// components
import DetailsView from "./DetailsView";
import GalleryView from "./GalleryView";

// hooks

export default function BrowseTab(props) {
  const { fetchedImages, fetchedLibraries, closeModal, onChange } = props;

  const [selectedImage, setSelectedImage] = useState();

  return (
    <section>
      <GalleryView
        imagesData={fetchedImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <DetailsView
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        fetchedLibraries={fetchedLibraries}
        onChange={onChange}
        closeModal={closeModal}
      />
    </section>
  );
}
