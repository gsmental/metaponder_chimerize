```tsx
import { MPSTableVarient } from "@/MPSComponents/MPSComponents";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import city from "../";

const Component = () => {
  const [StateList, setStateList] = useState<any[]>([]);

  useEffect(()=>{setStateList()},[])

  const Fields1: any = [
    {
      FieldValue: "countryId",
      FieldHeader: "countryId",
      component: {
        type: "input",
        changeHandler: (i, val) => {
          let arr = [...StateList];
          arr[i].countryId = val;
          setStateList(arr);
        },
      },
    },
    {
      FieldValue: "stateId",
      FieldHeader: "stateId",
      showAggregation: true,
      aggregationHeader: "No. of Students",
      aggregationFn: "sum",// there are many option
      component: {
        type: "select",
        changeHandler: (i, val) => {
          let arr = [...StateList];
          arr[i].stateId = val;
          setStateList(arr);
        },
        options: {
          data: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
            { label: "8", value: 8 },
            { label: "9", value: 9 },
            { label: "10", value: 10 },
            { label: "11", value: 11 },
            { label: "12", value: 12 },
          ],
          value: "value",
          label: "label",
        },
      },
    },
    {
      FieldValue: "stateName",
      FieldHeader: "stateName",
      component: {
        render: (row) => {
          return <p>{dayjs(row.stateName).format("DD-MMM-YYYY: h:mm A")}</p>;
        },
      },
    },
    {
      FieldValue: "isChecked",
      FieldHeader: "Select",
      component: {
        type: "checkbox",
        changeHandler: (i, val) => {
          let arr = [...StateList];
          arr[i].isChecked = val;
          setStateList(arr);
        },
      },
    },
  ];

  return (
    <div>
      <MPSTableVarient
        caption=""
        fields={Fields1}
        data={StateList}
        showSorting={false}
        paginationItemsCount={10}
        showPagination={false}
        showExporting={false}
        showViewField={false}
        showGlobalFilter={false}
      />
    </div>
  );
};

export default Component;
```
