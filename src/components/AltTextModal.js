import React, { useState } from "react";
import updateImage from "../hooks/updateImage";
import styled from "styled-components";

import { Label, Button, Modal, Input, FormGroup } from "@raketa-cms/raketa-mir";

const ModalContent = styled.div`
  max-height: 75vh;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding-top: ${(props) => props.theme.font.base};
  border-top: 1px solid ${(props) => props.theme.colors.gray};
`;

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
    <Modal title="Change alt text" onClose={() => setAltTextModal(false)}>
      <ModalContent>
        <FormGroup onSubmit={handleAltTextSubmit}>
          <Label>Enter new alt text:</Label>
          <Input type="text" value={altText} onChange={handleAltTextChange} />
        </FormGroup>

        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleAltTextSubmit}
          >
            Confirm
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setAltTextModal((prevState) => !prevState)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
