import React from "react";
import ReactLoading from "react-loading";
import "./loading.screen.css";

export default function Loading() {
  return (
    <div className="loading-screen d-flex flex-row justify-content-center loading-screen h-100 align-items-sm-center">
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={400}
        width={100}
        className="loading-screen"
      />
    </div>
  );
}
