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
  const [querryParamsImages, setQuerryParamsImages] = useState([]);

  const [imageData, setImageData] = useState({
    error: "",
    data: [],
    loading: false,
  });

  const [libraryData, setLibraryData] = useState({
    error: "",
    data: [],
    loading: false,
  });

  // fetch images data
  const fetchedImages = querryParamsImages.length
    ? listImages(querryParamsImages)
    : listImages();

  // fetch library
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
      setLibraryData({ ...imageData, loading: fetchedLibraries.loading });
    if (fetchedLibraries.data)
      setLibraryData({ ...imageData, data: fetchedLibraries.data });
    if (fetchedLibraries.error)
      setLibraryData({ ...imageData, error: fetchedLibraries.error });
  }, [fetchedLibraries.error, fetchedLibraries.loading, fetchedLibraries.data]);

  return (
    <Modal>
      <SearchBar
        querryParamsImages={querryParamsImages}
        setQuerryParamsImages={setQuerryParamsImages}
      />
      <LibrariesDropDown
        selectedLibrary={selectedLibrary}
        setSelectedLibrary={setSelectedLibrary}
        fetchedLibraries={libraryData.data}
      />
      <GalleryView
        imagesData={fetchedImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <DetailsView
        selectedImage={selectedImage}
        selectedLibrary={selectedLibrary}
        setSelectedLibrary={setSelectedLibrary}
        fetchedLibraries={libraryData.data}
      />
      <Button onClick={() => closeModal((prev) => !prev)}>close</Button>
    </Modal>
  );
}
