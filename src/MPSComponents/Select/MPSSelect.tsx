import React from 'react';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import Select from 'react-select';
import { InputErrorMessage } from '../Utils/InputErrorMessage';

type MPSSelectElemnt = StateManagerProps;

interface MPSSelectProps extends MPSSelectElemnt {
  register: any;
  errors: any;
  selectLabel: any;
  selectValue: any;
  showErrorMessage?: boolean;
}

export const MPSSelect = React.forwardRef<MPSSelectElemnt, MPSSelectProps>(
  (
    {
      register,
      errors,
      selectLabel,
      selectValue,
      showErrorMessage = true,
      ...props
    },
  ) => {
    return (
      <>
        <Select
          maxMenuHeight={250}
          menuPlacement="bottom"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: errors[register.name] ? 'red' : 'grey',
            }),
          }}
          {...register}
          getOptionLabel={(opt: any) => `${opt[selectLabel]}`}
          getOptionValue={(opt: any) => `${opt[selectValue]}`}
          {...props}
          isClearable={true}
        />
        {errors[register.name] && showErrorMessage && (
          <InputErrorMessage
            fieldName={errors[register.name]}
          ></InputErrorMessage>
        )}
      </>
    );
  }
);
