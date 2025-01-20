```tsx

import { MPSDatePickerComponent } from "@/MPSComponents/MPSComponents";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Input {
  fromDate: Date;
}

const Component = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<Input>({
    mode: "onChange",
  });

  const [tableData, setTableData] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<Date>(new Date());

  return (
    <div>
      <MPSDatePickerComponent
        id="fromDate"
        label="From Date"
        onChange={(date) => {
          errors.fromDate = null;
          setValue("fromDate", date);
          setFromDate(date);
        }}
        placeholderText="Select from date"
        showRequiredAsterisk={true}
        className="form-control"
        selected={fromDate}
        register={{
          ...register("fromDate", { required: true }),
        }}
        errors={errors}
        colLg={5}
      />
    </div>
  );
};

export default Component;


```