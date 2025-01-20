import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends ReactDatePickerProps {}

export const MPSDatePicker = React.forwardRef<
  ReactDatePickerProps,
  DatePickerProps
>(({ ...props }, ref) => {
  return (
    <>
      <DatePicker {...props} preventOpenOnFocus ref={ref}/>
    </>
  );
});
