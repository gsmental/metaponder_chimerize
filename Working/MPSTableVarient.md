```tsx
import { MPSTableVarient } from "@/MPSComponents/MPSComponents";
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

  const [StudentList, setStudentList] = useState<any[]>([]);

  const Fields1: any = [
    {
      FieldValue: "frm_RollNo",
      FieldHeader: "Roll No.",
      component: {
        type: "input",
        changeHandler: (i, val) => {
          let arr = [...StudentList];
          arr[i].frm_RollNo = val;
          setStudentList(arr);
        },
      },
    },
    {
      FieldValue: "MFD_SemId",
      FieldHeader: "Semester",
      showAggregation: true,
      aggregationHeader: "No. of Students",
      aggregationFn: "sum",
      component: {
        type: "select",
        changeHandler: (i, val) => {
          let arr = [...StudentList];
          arr[i].MFD_SemId = val;
          setStudentList(arr);
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
      FieldValue: "payment_date",
      FieldHeader: "Payment Date",
      component: {
        render: (row) => {
          return <p>{dayjs(row.payment_date).format("DD-MMM-YYYY: h:mm A")}</p>;
        },
      },
    },
    {
      FieldValue: "isChecked",
      FieldHeader: "Select",
      component: {
        type: "checkbox",
        changeHandler: (i, val) => {
          let arr = [...StudentList];
          arr[i].isChecked = val;
          setStudentList(arr);
        },
      },
    },
  ];

  return (
    <div>
      <MPSTableVarient
        caption=""
        fields={Fields1}
        data={StudentList}
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
