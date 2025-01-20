```tsx 

import { MPSTextComponent } from "@/MPSComponents/MPSComponents";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Input {
  name: string;
}

const Component = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Input>({
    mode: "onChange",
  });

  const to_get_value = () => {
    const name = getValues("name");
  };

  return (
    <div>
      <MPSTextComponent
        register={register("name", { required: true })}
        errors={errors}
        label="Your Name"
        showRequiredAsterisk
      />
    </div>
  );
};

export default Component;

```