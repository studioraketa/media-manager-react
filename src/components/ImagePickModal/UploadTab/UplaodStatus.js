import React from "react";
import styled from "styled-components";

const ProgressWrapper = styled.div`
  max-width: 30%;
  min-width: 30%;
  display: inline-flex;
  background-color: ${(props) => props.theme.colors.gray};
`;

const UploadStatus = (props) => {
  const { files } = props;

  const dataToDisplay = files.length
    ? files.map((el, index) => {
        return (
          <div key={index}>
            <p>
              status: {el.status}; name: {el.name}
            </p>
          </div>
        );
      })
    : null;

  return <ProgressWrapper>{dataToDisplay}</ProgressWrapper>;
};

export default UploadStatus;
