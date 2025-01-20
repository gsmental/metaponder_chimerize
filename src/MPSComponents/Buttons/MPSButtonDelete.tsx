import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { MPSIconBS } from "../Icons/MPSIconBS";

type ButtonElement = HTMLButtonElement;

interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
  text?: string;
  onClickHandler: Function;
  showConfirmation?: boolean;
  confirmationMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const MPSButtonDelete = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      text = "",
      onClickHandler,
      showConfirmation = true,
      confirmationMessage = "You want to delete data !",
      confirmButtonText = "",
      cancelButtonText = "",
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (showConfirmation) {
        Swal.fire({
          title: "Are you sure ?",
          text: confirmationMessage,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: confirmButtonText
            ? confirmButtonText
            : "Yes, Delete it!",
          cancelButtonText: cancelButtonText
            ? cancelButtonText
            : "No, Cancel it",
          confirmButtonColor: "#ec4561",
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
        <Button {...props} onClick={handleClick} className="btn-danger btn-sm" ref={ref}>
          <span className="p-1">
            <MPSIconBS icon="bi-trash" />
          </span>
          {text}
        </Button>
      </div>
    );
  }
);
