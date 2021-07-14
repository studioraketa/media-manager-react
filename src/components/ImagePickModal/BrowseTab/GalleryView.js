import React from "react";
import styled from "styled-components";

const ImageList = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 1em;
  min-height: 500px;
`;

const Image = styled.img`
  position: relative;
  cursor: pointer;
  width: 116px;
  height: 116px;
  border: 4px solid
    ${(props) => (props.selected ? props.theme.colors.success : "transparent")};

  &:hover {
    border: 4px solid
      ${(props) =>
        props.selected
          ? props.theme.colors.success
          : props.theme.colors.grayDark};
  }
`;

export default function GalleryView(props) {
  const { imagesData, selectedImage, setSelectedImage } = props;

  const handleselectImage = (ev) => {
    ev.preventDefault();
    const elementId = ev.target.id;
    const loadedImages = imagesData.data;
    const image = loadedImages.find((el) => +el.id === +elementId);
    setSelectedImage(image);
  };

  const imagesToDisplay =
    imagesData.data && imagesData.data.length
      ? imagesData.data.map((el) => (
          <Image
            key={el.id}
            heigth="100px"
            width="100px"
            src={el.urls.original}
            id={el.id}
            selected={selectedImage ? el.id === selectedImage.id : false}
            onClick={handleselectImage}
          />
        ))
      : null;

  return <ImageList>{imagesToDisplay}</ImageList>;
}
