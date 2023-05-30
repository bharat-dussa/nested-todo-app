import { Modal, ModalProps, Typography } from "antd";
import React, { FC } from "react";
import { Todo } from "../../utils/interfaces/todo.interface";
import TextArea from "antd/es/input/TextArea";
import { isEmpty, isUndefined } from "lodash";
import { useTodos } from "../../store/todo-context";

interface ISubTaskModal extends ModalProps {
  currentSelectedTodo: Todo;
  InputValue: string;
  handleOnChangeInputValue: (value: string) => void;
}
export const AddTodoModal: FC<ISubTaskModal> = ({
  currentSelectedTodo,
  InputValue,
  handleOnChangeInputValue,
  ...props
}) => {

  const { isError } = useTodos();
   
  return (
    <Modal
      title={
        <Typography.Text>
          {isUndefined(currentSelectedTodo) || isEmpty(currentSelectedTodo) ? (
            "Add New task"
          ) : (
            <Typography.Text>
              Add sub task for{" "}
              <Typography.Text strong>
                {currentSelectedTodo?.name}
              </Typography.Text>
            </Typography.Text>
          )}
        </Typography.Text>
      }
      {...props}
    >
      <TextArea
        rows={4}
        status={isError ? "error" : ''}
        className="text-sm"
        placeholder="Add SubTodo"
        value={InputValue}
        onChange={(e) => handleOnChangeInputValue(e.target.value)}
        required
      />
    </Modal>
  );
};
