import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, FormGroup } from "@raketa-cms/raketa-mir";
import styled from "styled-components";

// components
import SearchBar from "./SearchBar";
import LibrariesDropDown from "./LibrariesDropDown";
import BrowseTab from "./BrowseTab/BrowseTab";
import UploadTab from "./UploadTab/UploadTab";

// hooks
import listImages from "../../hooks/listImages";
import listLibraries from "../../hooks/listLibraries";
import deleteImage from "../../hooks/deleteImage";

const ModalContent = styled.div`
  max-height: 75vh;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding-top: ${(props) => props.theme.font.base};
  border-top: 1px solid ${(props) => props.theme.colors.gray};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px;
`;

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

  const [fetchDeleteImage, deleteImageResponse] = deleteImage();

  const [selectedImage, setSelectedImage] = useState();

  const handleDelete = async (ev) => {
    ev.preventDefault();
    const deleteResponse = await fetchDeleteImage(ev.target.id);
    const images = imageData.data.filter((el) => {
      return el.id !== deleteResponse.id;
    });
    setImageData({ ...imageData, data: images });
  };

  // fetch images data
  const fetchedImages = querryParamsImages.length
    ? listImages(querryParamsImages)
    : listImages();

  // fetch library
  const fetchedLibraries = listLibraries();

  useEffect(() => {
    setImageData(fetchedImages);
    if (fetchedImages.loading !== imageData.loading) {
      setImageData({ ...imageData, loading: fetchedImages.loading });
    }
    if (fetchedImages.data) {
      setImageData({
        ...imageData,
        data: fetchedImages.data,
      });
    }
    if (fetchedImages.error) {
      setImageData({ ...imageData, error: fetchedImages.error });
    }
  }, [fetchedImages.error, fetchedImages.loading, fetchedImages.data.length]);

  useEffect(() => {
    if (fetchedLibraries.loading !== imageData.loading)
      setLibraryData({ ...libraryData, loading: fetchedLibraries.loading });
    if (fetchedLibraries.data)
      setLibraryData({ ...libraryData, data: fetchedLibraries.data });
    if (fetchedLibraries.error)
      setLibraryData({ ...libraryData, error: fetchedLibraries.error });
  }, [fetchedLibraries.error, fetchedLibraries.loading, fetchedLibraries.data]);

  return (
    <Modal title="Choose new image" onClose={() => closeModal(false)}>
      <ModalContent>
        <ModalHeader>
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
        </ModalHeader>
        <Tabs>
          <div title="Browse">
            <BrowseTab
              fetchedImages={imageData}
              fetchedLibraries={libraryData}
              setImageData={setImageData}
              onChange={onChange}
              closeModal={closeModal}
              fetchDeleteImage={fetchDeleteImage}
              deleteImageResponse={deleteImageResponse}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleDelete={handleDelete}
            />
          </div>
          <div title="Upload">
            <UploadTab />
          </div>
        </Tabs>
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => closeModal((prev) => !prev)}>close</Button>
      </ModalFooter>
    </Modal>
  );
}
