```tsx

import { MPSSelectComponent } from "@/MPSComponents/MPSComponents";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import city from "../samples/data/Cities.json";

interface Input {
  city_name: string;
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
  const [SelectedData, setSelectedData] = useState<any>(null);

  useEffect(() => {
    setTableData(city);
  }, []);

  return (
    <div>
      <MPSSelectComponent
        register={register("city_name", { required: true })}
        errors={errors}
        label="Select city"
        placeholder="Select"
        options={tableData}
        selectLabel="cityName"
        selectValue="cityId"
        value={SelectedData}
        onChange={(val: any) => {
          errors.city_name = null;
          if (val) {
            setSelectedData(val);
            setValue("city_name", val);
            alert(val,"hello")
          } else {
            setSelectedData(null);
            setValue("city_name", null);
          }
        }}
        showRequiredAsterisk
        colLg={3}
        isMulti={false}
      />
    </div>
  );
};

export default Component;

```

