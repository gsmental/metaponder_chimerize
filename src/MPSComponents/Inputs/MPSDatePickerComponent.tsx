import React from "react";
import { Col } from "react-bootstrap";
import { ReactDatePickerProps } from "react-datepicker";
import { MPSDatePicker } from "./MPSDatePicker";
import { InputErrorMessage } from "../Utils/InputErrorMessage";

interface DatePickerProps extends ReactDatePickerProps {
  register: any;
  errors: any;
  label: string;
  colSm?: number;
  colMd?: number;
  colLg?: number;
  showErrorMessage?: boolean;
  showRequiredAsterisk?: boolean;
  mpsClassName?: any;
}
export const MPSDatePickerComponent = React.forwardRef<
  ReactDatePickerProps,
  DatePickerProps
>(
  (
    {
      register,
      errors,
      colSm = 6,
      colMd = 6,
      colLg = 6,
      label,
      showErrorMessage = true,
      // dateFormat = "dd-MM-yyyy",
      showRequiredAsterisk = false,
      mpsClassName,
      ...props
    },
    ref
  ) => {
    return (
      <Col sm={colSm} md={colMd} lg={colLg} ref={ref}>
        {" "}
        {label && (
          <label>
            {label}
            {showRequiredAsterisk && (
              <span className="text-danger">*</span>
            )}{" "}
          </label>
        )}
        <MPSDatePicker
          ref={register.ref}
          {...register}
          {...props}
          className={`form-control ${
            errors[register.name] ? "is-invalid" : ""
          } ${mpsClassName} `}
          // dateFormat={dateFormat}
          autoComplete="off"
        />
        {errors[register.name] && showErrorMessage && (
          <InputErrorMessage
            fieldName={errors[register.name]}
          ></InputErrorMessage>
        )}
      </Col>
    );
  }
);
