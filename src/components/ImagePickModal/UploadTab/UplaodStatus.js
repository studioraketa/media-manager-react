import React from "react";
import styled from "styled-components";

const UploadStatusDetails = styled.div`
  max-width: 30%;
  min-width: 30%;
  display: inline-flex;
  background-color: ${(props) => props.theme.colors.gray};
`;

const UploadStatus = (props) => {
  const { files } = props;

  const dataToDisplay = files.length ? (
    files.map((el, index) => {
      return (
        <div key={index}>
          <p>
            status: {el.status}; name: {el.name}
          </p>
        </div>
      );
    })
  ) : (
    <p>no uploaded files</p>
  );

  return <UploadStatusDetails>{dataToDisplay}</UploadStatusDetails>;
};

export default UploadStatus;
