import React, { useState, useEffect } from "react";
import updateImage from "../hooks/updateImage";

import { P, Button, Modal } from "@raketa-cms/raketa-mir";
import * as mir from "@raketa-cms/raketa-mir";

export default function AltTextModal(props) {
  const { setAltTextModal, value, onChange } = props;

  const [altText, setAltText] = useState(value.name);

  const [fetchData, data] = updateImage();

  const handleAltTextChange = (ev) => {
    ev.preventDefault();
    setAltText(ev.target.value);
  };

  const handleAltTextSubmit = (ev) => {
    ev.preventDefault();
    const requestBody = {
      image: { settings: [{ key: "alt", value: altText }] },
    };
    fetchData(requestBody, value.id).then((res) => onChange(res));
    setAltTextModal(false);
  };

  return (
    <Modal>
      <mir.FormGroup>
        <form onSubmit={handleAltTextSubmit}>
          <P>Enter new alt text:</P>
          <input type="text" value={altText} onChange={handleAltTextChange} />
          <Button type="submit">Confirm</Button>
        </form>
        <Button onClick={() => setAltTextModal((prevState) => !prevState)}>
          Close
        </Button>
      </mir.FormGroup>
    </Modal>
  );
}
