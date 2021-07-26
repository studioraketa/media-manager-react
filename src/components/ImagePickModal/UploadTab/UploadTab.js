import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadImage from "../../../hooks/uploadImage";
import UploadStatus from "./UplaodStatus";
import styled from "styled-components";

const StyledDropzone = styled.div`
  position: relative;
  margin-bottom: 16px;
  height: 350px;
  color: #666;
  background-color: #efefef;
  border: 2px dashed #ddd;
`;

const DropzoneLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
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
    <div>
      <StyledDropzone>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <DropzoneLabel>Drop the files here ...</DropzoneLabel>
          ) : (
            <DropzoneLabel>
              Drag 'n' drop some files here, or click to select files
            </DropzoneLabel>
          )}
        </div>
      </StyledDropzone>
      <UploadStatus files={uploadStatus} />
    </div>
  );
}
