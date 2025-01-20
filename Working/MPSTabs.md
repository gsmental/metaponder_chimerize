``` tsx

import { MPSTabs } from "@/MPSComponents/MPSComponents";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
      <MPSTabs
        justify
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        tabsData={[
          {
            title: "Your Title",
            eventKey: "1",
            content: <Component1 />,
          },
          {
            title: "Your Title",
            eventKey: "2",
            content: <Component2 />,
          },
        ]}
      />
    </div>
  );
};

export default Component;


```