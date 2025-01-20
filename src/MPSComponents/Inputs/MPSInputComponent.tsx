import React, { HTMLInputTypeAttribute } from "react";
import { Col } from "react-bootstrap";
import MPSInputText from "./MPSInputText";

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
  maxLength?: number;
}

export const MPSTextComponent = React.forwardRef<
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
      maxLength=null,
      ...props
    },
  ) => {
    return (
      <>
        <Col sm={colSm} md={colMd} lg={colLg}>
          {" "}
          {label && (
            <label>
              {label}{" "}
              {showRequiredAsterisk && <span className="text-danger">*</span>}{" "}
            </label>
          )}
          <MPSInputText
            maxLength={maxLength}
            disabled={disabled}
            showErrorMessage={showErrorMessage}
            type={type}
            register={register}
            errors={errors}
            {...props}
            ref={register.ref}
            mpsClassName={mpsClassName}
          />
        </Col>
      </>
    );
  }
);
