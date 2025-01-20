
import React, { useState, useRef, useEffect } from "react";
import { Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { AdvanceSolutions } from "../../common/AdvanceSolutions";
import { MPSCustomButton, MPSModel } from "../MPSComponents";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

interface MPSFileUploadProps extends React.HTMLAttributes<FormControlElement> {
  label: string;
  colSm?: number;
  colMd?: number;
  colLg?: number;
  showRequiredAsterisk?: boolean;
  maxSizeInKB?: number;
  fileTypes?: string;
  onFileSuccess: Function;
  showViewButton?: boolean;
  clearField?: boolean;
}
export const MPSFileUpload = React.forwardRef<
  FormControlElement,
  MPSFileUploadProps
>(
  (
    {
      colLg = 6,
      colMd = 6,
      colSm = 6,
      label,
      showRequiredAsterisk = true,
      maxSizeInKB = 100,
      fileTypes = "image/jpeg,image/png,image/jpg,application/pdf",
      onFileSuccess,
      showViewButton = true,
      clearField,
      ...props
    },
    ref
  ) => {
    const fileRef = useRef(null);
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [showFile, setshowFile] = useState<boolean>(false);

    useEffect(() => {
      fileRef.current.value = null;
      setFileUrl(null);
      onFileSuccess({
        fileBase64: null,
        fileType: null,
        fileExtension: null,
        fileSize: null,
        fileName: null,
      });
    }, [clearField]);

    const onFileChangeHandler = async (e) => {
      if (!e.target.files[0]) {
        setFileUrl(null);
        fileRef.current.value = null;
        onFileSuccess({
          fileBase64: null,
          fileType: null,
          fileExtension: null,
          fileSize: null,
          fileName: null,
          file: null,
        });
      } else {
        if (e.target.files[0].size / 1024 > maxSizeInKB) {
          fileRef.current.value = null;
          setFileUrl(null);
          onFileSuccess({
            fileBase64: null,
            fileType: null,
            fileExtension: null,
            fileSize: null,
            fileName: null,
            file: null,
          });
          Swal.fire({
            titleText: `File size cannot be greater than ${maxSizeInKB} KB`,
            icon: "error",
          });
        } else {
          const base64 = await AdvanceSolutions.FileToBase64(e.target.files[0]);
          setFileUrl(base64);
          onFileSuccess({
            fileBase64: base64,
            fileType: e.target.files[0].type,
            fileExtension: "." + e.target.files[0].name.split(".").pop(),
            fileSize: Math.round(e.target.files[0].size / 1024),
            fileName: e.target.files[0].name,
            file: e.target.files[0],
          });
        }
      }
    };

    const onViewFileHandler = () => {
      setshowFile(true);
    };

    return (
      <>
        <Col sm={colSm} md={colMd} lg={colLg} ref={ref}>
          {label && (
            <label>
              {label}{" "}
              {showRequiredAsterisk && <span className="text-danger">*</span>}{" "}
            </label>
          )}
          <div className="d-flex gap-1">
            <input
              type="file"
              id="File"
              className="form-control"
              onChange={onFileChangeHandler}
              ref={fileRef}
              accept={fileTypes}
              {...props}
              onDragOver={(e) => e.preventDefault()}
            />
            {fileUrl && showViewButton === true && (
              <MPSCustomButton
                buttonIcon="bi bi-eye"
                text=""
                buttonColor="info"
                onClickHandler={onViewFileHandler}
              />
            )}
          </div>
        </Col>
        <MPSModel
          modelHeader="File Upload"
          show={showFile}
          onHide={() => {
            setshowFile(false);
          }}
          size="lg"
          centered
          scrollable
        >
          <iframe
            title="Base64 File Viewer"
            src={fileUrl}
            width="100%"
            height="700px"
            frameBorder="0"
          />
        </MPSModel>
      </>
    );
  }
);
