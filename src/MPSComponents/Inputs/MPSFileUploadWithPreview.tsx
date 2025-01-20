
  import React, { useState, useRef, useEffect } from "react";
  import { Col } from "react-bootstrap";
  import Swal from "sweetalert2";
import { AdvanceSolutions } from "../../common/AdvanceSolutions";
  
  interface MPSFileUploadProps {
    label: string;
    colSm?: number;
    colMd?: number;
    colLg?: number;
    showRequiredAsterisk?: boolean;
    maxSizeInKB?: number;
    fileTypes?: string;
    onFileSuccess: Function;
    clearField?: boolean;
    imgWidth?:string;
    imgHeight?:string;
    showClearImage?:boolean;
    props?:any;

  }
  export const MPSFileUploadWithPreview: React.FC<MPSFileUploadProps> = ({
    colLg = 6,
    colMd = 6,
    colSm = 6,
    label,
    showRequiredAsterisk = true,
    maxSizeInKB = 100,
    fileTypes = "image/jpeg,image/png,image/jpg,application/pdf",
    onFileSuccess,
    clearField,
    imgWidth,
    imgHeight,
    showClearImage,
    props
  }) => {
    const fileRef = useRef(null);
    const [fileUrl, setFileUrl] = useState<any>(null);
  
    const resetFileUpload = () => {
        setFileUrl(null);
        if (fileRef.current) fileRef.current.value = null;
        onFileSuccess({
          fileBase64: null,
          fileType: null,
          fileExtension: null,
          fileSize: null,
          fileName: null,
          file: null,
        });
      };

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
        resetFileUpload();
      } else {
        if (e.target.files[0].size / 1024 > maxSizeInKB) {
            resetFileUpload();
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
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
          const file = files[0];
          const event = { target: { files: [file] } };
          onFileChangeHandler(event as any);
        }
      };

    const clearImage=(e)=>{
        e.stopPropagation();
        resetFileUpload();
    }
    return (
        <>
        <Col sm={colSm} md={colMd} lg={colLg}>
        <div className={`${fileUrl? "card":"card px-4 pt-2 pb-4"}`}>
          {label && (
            <label>
              {fileUrl? "":label}
              {showRequiredAsterisk && <span className="text-danger">*</span>}{" "}
            </label>
          )}
          <div
            className={`${fileUrl? "":"drag-and-drop-area border rounded d-flex justify-content-center align-items-center"}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            style={{ ...props }}
          >
            <div className="dz-default dz-message text-center">
              <input
                type="file"
                id="File"
                className="form-control"
                onChange={onFileChangeHandler}
                ref={fileRef}
                accept={fileTypes}
                hidden
              />
              {!fileUrl &&
              <>
              <i className="bi bi-cloud-arrow-up text-primary" style={{ fontSize: "2rem" }}></i>
              <div className="mt-3 p-2">Drop files here or click to upload.</div>
              </>}  
            </div>
              {fileUrl && (
                <div
                className="px-2 py-2"
                  style={{ marginTop: '20px', display: 'inline-block', justifyContent: 'center', position: 'relative' }}>
                    <div className="text-center">
                        {showClearImage &&
                     <span
                        onClick={(e)=>clearImage(e)}
                        className="bg-dark border rounded-pill px-1"
                        style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left:0,
                        cursor: 'pointer', 
                        zIndex: 10 ,
                        width:"22px",
                        height:"22px"
                    }} >
                    <i className="bi bi-x text-white " />
                    </span>}
                    <img 
                     src={fileUrl}
                     className="rounded"
                     width={imgWidth}
                     height={imgHeight}
                    />
                    </div>
              </div>
              )}
          </div>
          </div>
        </Col>
      </>
      
    );
  };