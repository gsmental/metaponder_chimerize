import React from "react";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { Col } from "react-bootstrap";
import { MPSSelect } from "./MPSSelect";

type MPSSelectElemnt = StateManagerProps;

interface MPSSelectProps extends MPSSelectElemnt {
  register: any;
  errors: any;
  label: string;
  colSm?: number;
  colMd?: number;
  colLg?: number;
  selectLabel: any;
  selectValue: any;
  showErrorMessage?: boolean;
  showRequiredAsterisk?: boolean;
}

export const MPSSelectComponent = React.forwardRef<
  MPSSelectElemnt,
  MPSSelectProps
>(
  (
    {
      register,
      label,
      colSm = 6,
      colLg = 6,
      colMd = 6,
      errors,
      selectLabel,
      selectValue,
      showErrorMessage = true,
      showRequiredAsterisk = false,
      ...props
    },
  ) => {
    return (
      <>
        <Col sm={colSm} md={colMd} lg={colLg}>
          {/* <label>{label}</label> */}
          {label && (
            <label>
              {label}{" "}
              {showRequiredAsterisk && <span className="text-danger">*</span>}{" "}
            </label>
          )}
          <MPSSelect
            register={register}
            errors={errors}
            selectLabel={selectLabel}
            selectValue={selectValue}
            showErrorMessage={showErrorMessage}
            {...props}
          />
        </Col>
      </>
    );
  }
);
