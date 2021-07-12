import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import uploadImage from "../../../hooks/uploadImage";

export default function UploadTab() {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      acceptedFiles.forEach(async (element) => {
        const data = await fetchUploadImage(element);
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [fetchUploadImage, state] = uploadImage();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
