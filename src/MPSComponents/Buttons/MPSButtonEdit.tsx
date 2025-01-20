import React from "react";
import { Button } from "react-bootstrap";
import { MPSIconBS } from "../Icons/MPSIconBS";

type ButtonElement = HTMLButtonElement;

interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
  text?: string;
  onClickHandler: Function;
}

export const MPSButtonEdit = React.forwardRef<ButtonElement, ButtonProps>(
  (
    {
      text = "",
      onClickHandler,

      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      onClickHandler();
    };

    return (
      <div>
        <Button
          onClick={handleClick}
          className="btn btn-secondary btn-sm"
          {...props} ref={ref}>
          <span className="p-1">
            <MPSIconBS icon="bi-pencil-square" />
          </span>
          {text}
        </Button>
      </div>
    );
  }
);
