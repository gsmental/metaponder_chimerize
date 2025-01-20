import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Color } from "react-bootstrap/esm/types";
import { MPSIconBS } from "../Icons/MPSIconBS";

type ButtonElement = HTMLButtonElement;

interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
  text?: string;
  onClickHandler: Function;
  buttonColor?: Color;
  buttonSize?: "sm" | "md" | "lg";
  buttonIcon?: string;
  customClass?: string;
  showButtonConfirmation?: boolean;
  buttonConfirmationText?: string;
  disabled?: boolean;
}

export const MPSCustomButton = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      text = "View",
      onClickHandler,
      buttonColor = "danger",
      buttonSize = "md",
      buttonIcon = "bi-clipboard",
      customClass = "",
      showButtonConfirmation = false,
      buttonConfirmationText = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (showButtonConfirmation) {
        Swal.fire({
          title: "Are you sure ?",
          text: buttonConfirmationText,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#338a25",
        }).then((resp) => {
          if (resp.isConfirmed) {
            onClickHandler();
          } else {
            return;
          }
        });
      } else {
        onClickHandler();
      }
    };

    return (
      <div>
        <Button
          disabled={disabled}
          onClick={handleClick}
          className={`btn btn-${buttonColor} btn-${buttonSize} ` + customClass}
          {...props}>
          {buttonIcon && (
            <span className="p-1">
              <MPSIconBS icon={buttonIcon} ref={ref}/>
            </span>
          )}
          {text}
        </Button>
      </div>
    );
  }
);
