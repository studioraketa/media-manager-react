import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadImage from "../../../hooks/uploadImage";
import UploadStatus from "./UplaodStatus";
import styled from "styled-components";

const ModalLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function UploadTab() {
  const [uploadStatus, setUploadStatus] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (element) => {
        const currentData = uploadStatus;
        currentData.push({ name: element.name, status: "pending" });
        setUploadStatus(currentData);
        const uploadResponse = await fetchUploadImage(element);
        if (uploadResponse) {
          const currentData = uploadStatus;
          const updateElement = currentData.find(
            (el) => el.name === element.name && el.status === "pending",
          );
          updateElement.status = "done";
          setUploadStatus(currentData);
        }
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [fetchUploadImage, state] = uploadImage();

  return (
    <ModalLayout>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <UploadStatus files={uploadStatus} />
    </ModalLayout>
  );
}
