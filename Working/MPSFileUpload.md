``` tsx 

import { MPSFileUpload } from "@/MPSComponents/MPSComponents";
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

  const [image, setImage] = useState(null);

  return (
    <div>
      <MPSFileUpload
        label="Image Upload"
        onFileSuccess={(data) => setImage(data)}
        colLg={4}
        showRequiredAsterisk={false}
        fileTypes=".png,.jpg,.jpeg"
      />
    </div>
  );
};

export default Component;

```