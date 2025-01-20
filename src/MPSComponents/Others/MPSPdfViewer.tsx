import React from "react";

const MPSPdfViewer = ({ base64, type = "application/pdf" }) => {
  return (
    <iframe
      src={`data:${type};base64,` + base64}
      width={"100%"}
      height={"500"}></iframe>
  );
};

export default MPSPdfViewer;
