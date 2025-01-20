import React, { JSX } from 'react';
import { ModalProps } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

type MPSModelElement = ModalProps;
interface MPSModelProps extends MPSModelElement {
  modelHeader?: string;
  children?: JSX.Element;
  onClose?: Function;
}

export const MPSModel = ({
  modelHeader = '',
  children,
  ...props
}: MPSModelProps) => {
  return (
    <>
      <Modal {...props} style={{ zIndex: 9998 }}>
        <Modal.Header closeButton>
          <Modal.Title>{modelHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
