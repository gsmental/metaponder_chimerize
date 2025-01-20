import React from "react";
export const InputErrorMessage = (props: any) => {
  // //console.log(props);
  ////console.log(props);
  ////////console.log(props.fieldName);

  if (props.fieldName.type === "required") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "This Field is required"}
      </span>
    );
  } else if (props.fieldName.type === "minLength") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "Type more Value"}
      </span>
    );
  } else if (props.fieldName.type === "maxLength") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "Character length is exceed"}
      </span>
    );
  } else if (props.fieldName.type === "min") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "Invalid Minimum Value"}
      </span>
    );
  } else if (props.fieldName.type === "max") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "value exceed as per requirement"}
      </span>
    );
  } else if (props.fieldName.type === "pattern") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "Invalid Format"}
      </span>
    );
  } else if (props.fieldName.type === "validate") {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "Not Matched"}
      </span>
    );
  } else {
    return (
      <span className="text-danger d-flex justify-content-end h6 mt-1">
        * {props.fieldName?.message || "Invalid Format"}
      </span>
    );
  }
};
