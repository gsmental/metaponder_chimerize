``` tsx

import { MPSModel } from "@/MPSComponents/MPSComponents";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Component = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Input>({
    mode: "onChange",
  });

  const [showModal, setshowModal] = useState<boolean>(false);

  return (
    <div>
    <MPSCustomButton
        text="Get Name"
        onClickHandler={()=>setshowModal(true)}
        buttonColor="success"
        buttonIcon="bi-search"
      />
      <MPSModel
        modelHeader="Your Label"
        show={showModal}
        onHide={() => setshowModal(false)}
        size="lg"
      >
        helo how are you
      
      </MPSModel>
    </div>
  );
};

export default Component;


```