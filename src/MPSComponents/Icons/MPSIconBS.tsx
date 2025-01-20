import React from 'react';

type IconElement = HTMLElement;

interface IconProps extends React.HTMLProps<IconElement> {
  icon: string;
}

export const MPSIconBS = React.forwardRef<IconElement, IconProps>(
  ({ icon, ...props }) => {
    return <i className={`bi ${icon}`} {...props}></i>;
  }
);
