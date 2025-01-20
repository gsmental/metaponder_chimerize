```tsx 

import { MPSTextComponent } from "@/MPSComponents/MPSComponents";
import React from "react";
import { useForm } from "react-hook-form";

interface Input {
  name: string;
}

const Component = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<Input>({
    mode: "onChange",
  });

  const to_get_value = () => {
    const name = getValues("name");
    console.log("Name:", name);
  };

  return (
    <div>
      <MPSTextComponent
        register={register("name", { required: "Name is required" })}
        errors={errors}
        label="Your Name"
        showRequiredAsterisk
      />
      <MPSCustomButton
        text="Get Name"
        onClickHandler={handleSubmit(to_get_value)}
        buttonColor="success"
        buttonIcon="bi-search"
      />
    </div>
  );
};

export default Component;

```