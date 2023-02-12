import React from "react";
import { Modal as MuiModal, ModalProps as MuiModalProps } from "@mui/material";
import style from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
} & MuiModalProps;

export const Modal = (props: ModalProps) => {
  return (
    <MuiModal
      {...props}
    >
      <div className={style.wrapper}>
        {props.children}
      </div>
    </MuiModal>
  );
};