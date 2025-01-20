import React from "react";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

import { Button, Col} from "react-bootstrap";
import { MPSSelect } from "./MPSSelect";
import { Color } from "react-bootstrap/esm/types";

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
  actionButtonText?: string;
  onAction: Function;
  actionButtonColor?: Color;
  showRequiredAsterisk?: boolean;
  actionButtonIcon?: string;
  actionButtonSize?: "sm" | "lg" | "md";
}

export const MPSSelectWithActionButton = React.forwardRef<
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
      actionButtonText = "Add",
      onAction,
      actionButtonColor = "info",
      showRequiredAsterisk = false,
      actionButtonIcon,
      actionButtonSize,
      ...props
    },
  ) => {
    return (
      <>
        <Col sm={colSm} md={colMd} lg={colLg}>
          {label && (
            <label>
              {label}{" "}
              {showRequiredAsterisk && <span className="text-danger">*</span>}{" "}
            </label>
          )}
          <div className="d-flex gap-1 align-items-center">
            <div style={{ width: "100%" }}>
              {" "}
              <MPSSelect
                register={register}
                errors={errors}
                selectLabel={selectLabel}
                selectValue={selectValue}
                showErrorMessage={showErrorMessage}
                {...props}
              />
            </div>
            <div>
              <Button
                className={`btn-${actionButtonColor} btn-${actionButtonSize}`}
                onClick={() => onAction()}>
                {actionButtonIcon && <i className={actionButtonIcon} />}
                {actionButtonText && actionButtonText}
              </Button>
            </div>
          </div>
        </Col>
      </>
    );
  }
);
