import React, {  useEffect, useRef, useState } from "react";
import { MPSCustomButton } from "../MPSComponents";

const MPSCamera = ({ onDone }: { onDone: Function }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  // const [isCameraStarted, setIsCameraStarted] = useState<boolean>(false);
  useEffect(() => {
    startCamera();
  }, []);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            exact: "user",
          },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      // setIsCameraStarted(true);
    } catch (error) {
      //console.error("Error accessing the camera:", error);
    }
  };
  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.translate(canvas.width, 0);
        context.scale(-1, 1);

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL("image/png");
        setCapturedImage(imageDataURL);
        const stream = video.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    }
  };

  return (
    <>
      {capturedImage === null ? (
        <div className="mt-2">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "95%",
                border: "2px solid black",
              }}>
              <video
                muted
                playsInline
                ref={videoRef}
                autoPlay={true}
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "scaleX(-1)",
                }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-1">
            <div style={{ width: "95%" }}>
              <MPSCustomButton
                buttonColor="secondary"
                text="Capture"
                buttonIcon="bi-camera-fill"
                style={{ width: "100%" }}
                onClickHandler={captureImage}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "95%", border: "2px solid black" }}>
              <div>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="img-fluid"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "95%" }} className="mt-1 d-flex gap-2">
              <div style={{ width: "100%" }}>
                <MPSCustomButton
                  buttonColor="danger"
                  text="Retake"
                  buttonIcon="bi-x-circle"
                  style={{ width: "100%" }}
                  onClickHandler={() => {
                    setCapturedImage(null);
                    // setIsCameraStarted(false);
                    startCamera();
                  }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <MPSCustomButton
                  buttonColor="success"
                  text="Done"
                  buttonIcon="bi-check2-circle"
                  style={{ width: "100%" }}
                  onClickHandler={() => {
                    onDone(capturedImage);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MPSCamera;
