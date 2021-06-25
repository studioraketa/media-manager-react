import React, { useState, useEffect } from "react";
import updateImage from "../hooks/updateImage";

import { P, Button, Modal } from "@raketa-cms/raketa-mir";
import * as mir from "@raketa-cms/raketa-mir";

export default function AltTextModal(props) {
  const setAltTextModal = props.setAltTextModal;
  const value = props.value;
  const [altText, setAltText] = useState(value.name);

  const handleAltTextChange = (ev) => {
    ev.preventDefault();
    setAltText(ev.target.value);
  };

  const handleAltTextSubmit = async (ev) => {
    ev.preventDefault();
    // call update alttext function and handle.
    // allign how this will be rendered - from props or the component itself should handle it;
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
