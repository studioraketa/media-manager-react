import React, { useState, useEffect } from "react";
import { Modal, Button } from "@raketa-cms/raketa-mir";

// components
import DetailsView from "./DetailsView";
import GalleryView from "./GalleryView";
import SearchBar from "./SearchBar";
import LibrariesDropDown from "./LibrariesDropDown";

// hooks
import listImages from "../../hooks/listImages";
import listLibraries from "../../hooks/listLibraries";

export default function ImagePickModal(props) {
  const { closeModal } = props;

  const [selectedImage, setSelectedImage] = useState();
  const [selectedLibrary, setSelectedLibrary] = useState();

  const [imageData, setImageData] = useState({
    error: "",
    data: [],
    loading: false,
  });

  const fetchedImages = listImages();
  const fetchedLibraries = listLibraries();

  useEffect(() => {
    if (fetchedImages.loading !== imageData.loading)
      setImageData({ ...imageData, loading: fetchedImages.loading });
    if (fetchedImages.data)
      setImageData({ ...imageData, data: fetchedImages.data });
    if (fetchedImages.error)
      setImageData({ ...imageData, error: fetchedImages.error });
  }, [fetchedImages.error, fetchedImages.loading, fetchedImages.data]);

  useEffect(() => {
    if (fetchedLibraries.loading !== imageData.loading)
      setImageData({ ...imageData, loading: fetchedLibraries.loading });
    if (fetchedLibraries.data)
      setImageData({ ...imageData, data: fetchedLibraries.data });
    if (fetchedLibraries.error)
      setImageData({ ...imageData, error: fetchedLibraries.error });
  }, [fetchedLibraries.error, fetchedLibraries.loading, fetchedLibraries.data]);

  console.log(fetchedLibraries);

  return (
    <Modal>
      <SearchBar />
      <LibrariesDropDown
        selectedLibrary={selectedLibrary}
        setSelectedLibrary={setSelectedLibrary}
        fetchedLibraries={fetchedLibraries}
      />
      <GalleryView
        imagesData={fetchedImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <DetailsView selectedImage={selectedImage} />
      <Button onClick={() => closeModal((prev) => !prev)}>close</Button>
    </Modal>
  );
}
