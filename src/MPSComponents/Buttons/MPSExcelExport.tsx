import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Color } from "react-bootstrap/esm/types";
import { DownlodExcelFromArray } from "metaponder-utility";
import { v4 as uuid } from "uuid";
import { MPSModel } from "../MPSModel/MPSModel";
import { MPSCustomButton } from "./MPSCustomButton";
import { MPSIconBS } from "../Icons/MPSIconBS";

interface MPSExcelExportButtonProps {
  data: any[];
  text?: string;
  buttonColor?: Color;
  buttonSize?: "sm" | "md" | "lg";
}

const MPSExcelExportButton: React.FC<MPSExcelExportButtonProps> = ({
  data,
  text = "Export",
  buttonColor = "secondary",
  buttonSize = "md",
}) => {
  const [showColumnSelectModel, setShowColumnSelectModel] =
    useState<boolean>(false);
  const [exportFields, setExportFields] = useState<any[]>([]);

  const handleClick = () => {
    const myFields = Object.keys(data[0]);
    const myExportFields = [];
    for (let index = 0; index < myFields.length; index++) {
      myExportFields.push({ title: myFields[index], isSelected: false });
    }
    setExportFields(myExportFields);
    setShowColumnSelectModel(true);
  };

  const handleExport = () => {
    const exportData = [];
    for (let index = 0; index < data.length; index++) {
      const myObj = {};
      for (let j = 0; j < exportFields.length; j++) {
        if (exportFields[j].isSelected === true) {
          myObj[exportFields[j]["title"]] = data[index][exportFields[j].title];
        }
      }
      exportData.push(myObj);
    }
    DownlodExcelFromArray(uuid() + ".xlsx", exportData);
    setShowColumnSelectModel(false);
  };

  return (
    <div>
      <MPSModel
        modelHeader="Export Fields"
        show={showColumnSelectModel}
        onHide={() => {
          setShowColumnSelectModel(false);
        }}
        scrollable
        size="sm"
        centered>
        <table className="table table-sm table-bordered table-hover">
          <caption style={{ captionSide: "top" }}>List of Fields</caption>
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {exportFields.map((field, index) => {
              return (
                <tr
                  style={
                    field.isSelected ? { backgroundColor: "#edf0f5" } : null
                  }>
                  <td>{field.title}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={field.isSelected}
                      onChange={(e) => {
                        let myExportFields = [...exportFields];
                        myExportFields[index].isSelected = e.target.checked;
                        setExportFields(myExportFields);
                      }}></input>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <MPSCustomButton
                  onClickHandler={handleExport}
                  text="Export"
                  buttonSize="sm"
                  buttonColor="secondary"
                  buttonIcon="bi-filetype-xlsx"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </MPSModel>
      <Button
        disabled={data.length === 0 ? true : false}
        onClick={handleClick}
        className={`btn btn-${buttonColor} btn-${buttonSize}`}>
        <span className="p-1">
          <MPSIconBS icon={"bi-filetype-xlsx"} />
        </span>
        {text}
      </Button>
    </div>
  );
};

export default MPSExcelExportButton;
