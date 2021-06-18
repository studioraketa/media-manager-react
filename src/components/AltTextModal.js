import React from "react";

import { P, Button, Modal } from "@raketa-cms/raketa-mir";

export default function AltTextModal(props) {
  const setAltTextModal = props.setAltTextModal;
  return (
    <Modal>
      <P>Test Modal. This should change to form. Use separate component</P>
      <Button onClick={() => setAltTextModal((prevState) => !prevState)}>
        X
      </Button>
    </Modal>
  );
}
