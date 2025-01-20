import React from "react";

type MPSRadioButtonProps = {
  onPress: () => void;
  selected: boolean;
  label: string;
};

const MPSRadioButton: React.FC<MPSRadioButtonProps> = ({
  onPress,
  selected = false,
  label,
}) => {
  return (
    <div className="mb-2 w-[50%] flex-row items-center justify-start">
      <div
        className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white"
        onClick={onPress}>
        <div className={`h-2 w-2 rounded-full ${selected ? "bg-white" : ""}`} />
      </div>
      <h5>{label}</h5>
    </div>
  );
};

export default MPSRadioButton;
