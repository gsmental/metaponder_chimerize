import React from "react";

import MPSRadioButton from "./MPSRadioButton";

type data = {
  label: string;
};

type MPSRadioButtonGroupProps = {
  selectedItem: number;
  cb: (newItem: number) => void;
  radioButtons: data[];
};

const MPSRadioButtonGroup: React.FC<MPSRadioButtonGroupProps> = ({
  selectedItem = 0,
  radioButtons,
  cb,
}) => {
  return (
    <div className="row">
      {radioButtons.map((item, index) => (
        <div key={index} className="col-md-6">
          <MPSRadioButton
            selected={index === selectedItem}
            onPress={() => {
              cb(index);
            }}
            label={item.label}
          />
        </div>
      ))}
    </div>
  );
};

export default MPSRadioButtonGroup;
