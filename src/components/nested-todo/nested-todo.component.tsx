import React, { useCallback, useEffect, useMemo, useState } from "react";
import NoTodo from "../not-todo/not-todo.component";
import AddTodo from "../common/add-todo.component";
import { Modal, Tree } from "antd";
import {
  LOCAL_KEYS,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/local-storage.util";
import TextArea from "antd/es/input/TextArea";
import {
  deleteTodoRecursively,
  extractCheckedIds,
  generateId,
  handleAddSubTodoRecursively,
  toggleTodoRecursively,
} from "../../utils/common.utils";
import "./nested-todo.less";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import DeleteModal from "../modals/delete-modal.component";

interface Todo {
  id: string;
  name: string;
  isChecked: boolean;
  subTodos: Todo[];
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    getLocalStorageItem(LOCAL_KEYS.USER_TASKS) || []
  );
  const [newTodoName, setNewTodoName] = useState("");
  const [newSubTodoName, setSubNewTodoName] = useState("");
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(
    extractCheckedIds()
  );
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [currentSelectedTodo, setCurrentSelectedTodo] = useState<Todo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCheck = (checkedKeysValue: any, { node }: any) => {
    const { key } = node;
    const checkedTodoIds = checkedKeysValue.checked || [];

    handleToggleTodo(key);
    setCheckedKeys(checkedTodoIds);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  const handleAddTodo = () => {
    if (newTodoName.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: generateId(),
      name: newTodoName,
      isChecked: false,
      subTodos: [],
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoName("");
  };

  const handleToggleTodo = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      return toggleTodoRecursively(prevTodos, todoId);
    });
  }, []);

  const handleDeleteTodo = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      return deleteTodoRecursively(prevTodos, todoId);
    });
  }, []);

  const handleAddSubTodo = (parentId: string) => {
    const subTodoName = newSubTodoName;
    if (!subTodoName || subTodoName.trim() === "") {
      return;
    }

    const newSubTodo: Todo = {
      id: generateId(),
      name: subTodoName,
      isChecked: false,
      subTodos: [],
    };

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === parentId) {
          return {
            ...todo,
            subTodos: [...todo.subTodos, newSubTodo],
          };
        } else if (todo.subTodos.length > 0) {
          return {
            ...todo,
            subTodos: handleAddSubTodoRecursively(
              todo.subTodos,
              parentId,
              newSubTodo
            ),
          };
        } else {
          return todo;
        }
      })
    );

    setSubNewTodoName("");
  };

  const showModal = (todo: Todo) => {
    setCurrentSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddSubTodo((currentSelectedTodo as Todo)?.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModal = (todo: Todo) => {
    setShowDeleteModal(true);
    setCurrentSelectedTodo(todo);
  };

  const convertResponseToTodoList = useCallback(
    (data: Todo[]) => {
      const convertTodo = (todo: any) => {
        return {
          title: () => (
            <div className="nested-todo visible">
              <div className="flex justify-between gap-16">
                <p
                  className={
                    checkedKeys.includes(todo.id)
                      ? "line-through text-slate-400"
                      : ""
                  }
                >
                  {todo.name}
                </p>
                <div className="flex gap-4">
                  <DeleteOutlined
                    style={{
                      color: "red",
                    }}
                    onClick={() => handleDeleteModal(todo)}
                  />
                  <FileAddOutlined
                    style={{
                      color: "text-primary-600",
                    }}
                    type="primary"
                    onClick={() => showModal(todo)}
                  />
                </div>
              </div>
            </div>
          ),
          key: todo.id,
          children: todo.subTodos ? todo.subTodos.map(convertTodo) : [],
        };
      };

      return data.map(convertTodo);
    },
    [checkedKeys]
  );

  const treeData = useMemo(
    () => convertResponseToTodoList(todos),
    [convertResponseToTodoList, todos]
  );

  useEffect(() => {
    setLocalStorageItem(LOCAL_KEYS.USER_TASKS, todos);
  }, [todos, handleToggleTodo]);

  const handleOnOKDeleteModal = () => {
    handleDeleteTodo(currentSelectedTodo?.id as string);
    setShowDeleteModal(false);
  };

  const handleOnCancelDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4 flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
        <AddTodo
          todoName={newTodoName}
          onChangeAddTodo={(value) => setNewTodoName(value)}
          onClickAddTodo={handleAddTodo}
        />
      </div>
      {todos.length > 0 ? (
        <Tree
          className="nested-tree"
          checkable
          checkStrictly
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      ) : (
        <NoTodo />
      )}
      <Modal
        title={
          <p>
            Add sub task for <b>{currentSelectedTodo?.name}</b>
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          rows={4}
          className="text-sm"
          placeholder="Add SubTodo"
          value={newSubTodoName}
          onChange={(e) => setSubNewTodoName(e.target.value)}
        />
      </Modal>

      <DeleteModal
        open={showDeleteModal}
        onOk={handleOnOKDeleteModal}
        onCancel={handleOnCancelDeleteModal}
        currentSelectedTodo={currentSelectedTodo}
      />
    </div>
  );
};

export default TodoApp;
