import { Popover, Typography } from "antd";
import React from "react";
import { Todo } from "../../utils/interfaces/todo.interface";
import {
  DeleteOutlined,
  FileAddOutlined,
  SwapOutlined,
} from "@ant-design/icons";

interface ITodoNode {
  todo: Todo;
  checkedKeys: React.Key[];
  handleDeleteModal: (todo: Todo) => void;
  showModal: (todo: Todo) => void;
}
const TodoNode = ({
  todo,
  checkedKeys,
  handleDeleteModal,
  showModal,
}: ITodoNode) => {
  return (
    <div className="nested-todo visible m-1">
      <div className="flex justify-between gap-16">
        <Popover content={todo.name}>
          <Typography.Text
            ellipsis
            className={
              checkedKeys?.includes(todo.id)
                ? "line-through text-slate-400 w-96"
                : "w-96"
            }
          >
            {todo.name}
          </Typography.Text>
        </Popover>

        <div className="flex gap-4">
          {todo.subTodos.length > 0 ? (
            <Typography.Text className="flex gap-2" type="secondary">
              <SwapOutlined />
              {todo.subTodos.length}
            </Typography.Text>
          ) : null}
          <DeleteOutlined
            style={{
              color: "red",
              fontSize: "1rem",
            }}
            onClick={() => handleDeleteModal(todo)}
          />
          <FileAddOutlined
            style={{
              color: "text-primary-600",
              fontSize: "1rem",
            }}
            type="primary"
            onClick={() => showModal(todo)}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoNode;
