import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs } from "@raketa-cms/raketa-mir";

// components
import SearchBar from "./SearchBar";
import LibrariesDropDown from "./LibrariesDropDown";
import BrowseTab from "./BrowseTab/BrowseTab";
import UploadTab from "./UploadTab/UploadTab";

// hooks
import listImages from "../../hooks/listImages";
import listLibraries from "../../hooks/listLibraries";

export default function ImagePickModal(props) {
  const { closeModal, onChange } = props;

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
        querryParamsImages={querryParamsImages}
        setQuerryParamsImages={setQuerryParamsImages}
      />
      <Tabs>
        <div title="Browse">
          <BrowseTab
            fetchedImages={fetchedImages}
            fetchedLibraries={fetchedLibraries}
            onChange={onChange}
            closeModal={closeModal}
          />
        </div>
        <div title="Upload">
          <UploadTab />
        </div>
      </Tabs>

      <Button onClick={() => closeModal((prev) => !prev)}>close</Button>
    </Modal>
  );
}
