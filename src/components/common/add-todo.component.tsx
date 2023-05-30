import { FC, useState } from "react";
import { Todo } from "../../utils/interfaces/todo.interface";
import { AddTodoModal } from "../modals/add-todo-modal.component";
import { useTodos } from "../../store/todo-context";

export interface IAddTodo {
  todoName: string;
  onClickAddTodo: (parentId: string) => void;
  onChangeAddTodo: (value: string) => void;
  todo?: Todo;
}

const AddTodo: FC = () => {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const { handleAddTodo, newTodoName, setNewTodoName, setIsError } = useTodos();

  const handleOk = () => {
    if (newTodoName.trim() !== "") {
      handleAddTodo();
      setShowTodoModal(false);

      return;
    }

    setIsError(true);
  };

  const handleCancel = () => {
    setShowTodoModal(false);
  };

  const handleOnChangeSubtaskName = (value: string) => {
    setNewTodoName(value);
    setIsError(false);
  };

  return (
    <div className="flex gap-4">
      <button
        className="rounded-md bg-primary-600 py-2 px-5 text-white"
        onClick={() => setShowTodoModal(true)}
      >
        Add Todo
      </button>
      <AddTodoModal
        open={showTodoModal}
        onOk={handleOk}
        onCancel={handleCancel}
        InputValue={newTodoName}
        handleOnChangeInputValue={handleOnChangeSubtaskName}
        currentSelectedTodo={{} as Todo}
      />
    </div>
  );
};

export default AddTodo;
