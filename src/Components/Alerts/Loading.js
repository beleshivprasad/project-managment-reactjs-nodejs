import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        zIndex: 4,
        margin: "0px",
        padding: "0px",
      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
}

export default Loading;
