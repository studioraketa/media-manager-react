import React, { useState, useEffect } from "react";
import deleteImage from "../../../hooks/deleteImage";

// components
import DetailsView from "./DetailsView";
import GalleryView from "./GalleryView";

// hooks

export default function BrowseTab(props) {
  const {
    fetchedImages,
    fetchedLibraries,
    setImageData,
    closeModal,
    onChange,
  } = props;

  const [fetchDeleteImage, deleteImageResponse] = deleteImage();

  const [selectedImage, setSelectedImage] = useState();

  const handleDelete = async (ev) => {
    ev.preventDefault();
    const deleteResponse = fetchDeleteImage(ev.target.id);
  };

  console.log(deleteImageResponse);
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
        handleDelete={handleDelete}
        onChange={onChange}
        closeModal={closeModal}
      />
    </section>
  );
}
