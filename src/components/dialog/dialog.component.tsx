import React from "react";

import { Dialog } from "primereact/dialog";
import AddTodo, { IAddTodo } from "../common/add-todo.component";

export interface IDialogInput extends IAddTodo {
  visible: boolean;
  handleCloseModal: () => void;
  dataFor: string;
}
const DialogInput = ({ visible, handleCloseModal, dataFor, onChangeAddTodo, onClickAddTodo, todoName }: IDialogInput) => {
  return (
    <Dialog
      header={`Add sub todo for ${dataFor}`}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={handleCloseModal}
    >
      <AddTodo
        todoName={todoName}
        onChangeAddTodo={onChangeAddTodo}
        onClickAddTodo={onClickAddTodo}
      />
    </Dialog>
  );
};

export default DialogInput;
