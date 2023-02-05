import React, { Component } from "react";
import Modal from "react-modal";

type ModalPropsType = {
  isOpen: boolean;
  onRequestClose: () => void;
  label: string;
  component: Component;
};

const ModalComponent: React.FC<ModalPropsType> = ({
  isOpen,
  onRequestClose,
  label,
  component,
}) => {
  const styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginLeft: "1%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "50%",
      border: "3px solid #555",
      borderRadius: "12px",
      padding: "10px",
    },
  };
  return (
    <div>
      <Modal
        style={styles}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={label}
      >
        <>
          <h1 className="">{label}</h1>
          {component}
        </>
      </Modal>
    </div>
  );
};

export default ModalComponent;
