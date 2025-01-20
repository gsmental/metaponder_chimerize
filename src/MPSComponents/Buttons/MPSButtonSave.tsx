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
  confirmationButtonText?: string;
  cancellationButtonText?: string;
}

export const MPSButtonSave = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      text = "Save",
      onClickHandler,
      showConfirmation = false,
      confirmationMessage = "You want to save data !",
      confirmationButtonText = "Yes, Save it!",
      cancellationButtonText = "No, Cancel it",

      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (showConfirmation) {
        Swal.fire({
          title: "Are you sure ?",
          text: confirmationMessage,
          icon: "info",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: confirmationButtonText,
          cancelButtonText: cancellationButtonText,
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
        <Button {...props} onClick={handleClick} type="submit" ref={ref}>
          <MPSIconBS icon="bi-file-earmark-plus" /> {text}
        </Button>
      </div>
    );
  }
);
