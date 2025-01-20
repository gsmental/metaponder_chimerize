``` tsx

import {
  MPSButtonDelete,
  MPSButtonSave,
  MPSButtonEdit,
  MPSCustomButton,
} from "@/MPSComponents/MPSComponents";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import city from "../samples/data/Cities.json";

interface Input {
  ConfirmPassword: string;
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

  const [activeTab, setActiveTab] = useState<string>("1");

  return (
    <div>
      <MPSButtonDelete onClickHandler={() => handleDeleteDocs(row, index)} />
      <MPSButtonSave onClickHandler={HandleSubmitData} text="Save" />
      <MPSButtonEdit onClickHandler={() => handleDeleteDocs(row, index)} />
      <MPSCustomButton
        text="Search"
        onClickHandler={BindCheckInNoList}
        buttonColor="success"
        buttonIcon="bi-search"
      />
    </div>
  );
};

export default Component;

```