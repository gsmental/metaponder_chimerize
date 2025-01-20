import React, { HTMLInputTypeAttribute } from "react";
import { Col, Button } from "react-bootstrap";
import MPSInputText from "./MPSInputText";
import { Color } from "react-bootstrap/esm/types";
import { MPSIconBS } from "../Icons/MPSIconBS";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

interface FormControlProps extends React.HTMLAttributes<FormControlElement> {
  register: any;
  errors: any;
  label: string;
  colSm?: number;
  colMd?: number;
  colLg?: number;
  type?: string;
  mpsClassName?: HTMLInputTypeAttribute;
  showErrorMessage?: boolean;
  disabled?: boolean;
  showRequiredAsterisk?: boolean;
  actionButtonText?: string;
  onAction: Function;
  actionButtonColor?: Color;
  actionButtonIcon?: string;
  actionButtonShow?: boolean;
}

export const MPSTextComponentWithActionButton = React.forwardRef<
  FormControlElement,
  FormControlProps
>(
  (
    {
      register,
      errors,
      colSm = 6,
      colMd = 6,
      colLg = 6,
      label,
      type = "text",
      mpsClassName,
      showErrorMessage = true,
      disabled = false,
      showRequiredAsterisk = false,
      actionButtonText = "Edit",
      onAction,
      actionButtonColor = "secondary",
      actionButtonIcon = "bi-pencil-square",
      actionButtonShow = true,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <Col sm={colSm} md={colMd} lg={colLg} ref={ref}>
          {" "}
          {label && (
            <label>
              {label}{" "}
              {showRequiredAsterisk && <span className="text-danger">*</span>}{" "}
            </label>
          )}
          <div className="d-flex gap-1" style={{width:"100%"}}>
            <div style={{ width: "100%" }}>
              
              <MPSInputText
                disabled={disabled}
                showErrorMessage={showErrorMessage}
                type={type}
                register={register}
                errors={errors}
                {...props}
                ref={register.ref}
                mpsClassName={mpsClassName}
              />
            </div>
            {actionButtonShow && (
              <div style={{width:"auto"}}>
                <Button
                  className={`btn-${actionButtonColor}`}
                  onClick={() => onAction()}>
                  <span className="pr-1">
                    <MPSIconBS icon={actionButtonIcon} />
                  </span>
                  {actionButtonText}
                </Button>
              </div>
            )}
          </div>
        </Col>
      </>
    );
  }
);
