import React from "react";
import styled from "styled-components";

// components
import DetailsView from "./DetailsView";
import GalleryView from "./GalleryView";

const ModalLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function BrowseTab(props) {
  const {
    fetchedImages,
    fetchedLibraries,
    setImageData,
    closeModal,
    onChange,
    fetchDeleteImage,
    deleteImageResponse,
    selectedImage,
    setSelectedImage,
    handleDelete,
  } = props;

  return (
    <ModalLayout>
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
    </ModalLayout>
  );
}
