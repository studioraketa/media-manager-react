import React, { useState } from "react";

import { P, Button, Modal } from "@raketa-cms/raketa-mir";
import * as mir from "@raketa-cms/raketa-mir";

export default function AltTextModal(props) {
  const setAltTextModal = props.setAltTextModal;
  const currentAltText = props.currentAltText;
  const [altText, setAltText] = useState(currentAltText);

  const handleAltTextChange = (ev) => {
    ev.preventDefault();
    setAltText(ev.target.value);
  };

  const handleAltTextSubmit = (ev) => {
    ev.preventDefault();
    // call PUT hook
    console.log("submit");
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
