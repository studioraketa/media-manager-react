import React from "react";
import { Modal, P } from "@raketa-cms/raketa-mir";

export default function GalleryView(props) {
  const { imagesData, setSelectedImage } = props;

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
          <img
            heigth="100px"
            width="100px"
            src={el.urls.original}
            key={el.id}
            id={el.id}
            onClick={handleselectImage}
          />
        ))
      : null;

  return <div>{imagesToDisplay}</div>;
}
