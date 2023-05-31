import React, { useCallback, useEffect, useMemo, useState } from "react";
import NoTodo from "../not-todo/not-todo.component";
import AddTodo from "../common/add-todo.component";
import { Card, Col, Row, Statistic, Tree } from "antd";
import {
  LOCAL_KEYS,
  setLocalStorageItem,
} from "../../utils/local-storage.util";
import { countTotalData } from "../../utils/common.utils";
import "./nested-todo.less";
import { DownOutlined } from "@ant-design/icons";
import DeleteModal from "../modals/delete-modal.component";
import { AddTodoModal } from "../modals/add-todo-modal.component";
import { useTodos } from "../../store/todo-context";
import TodoNode from "../tree-node/tree-node.component";
import { Todo } from "../../utils/interfaces/todo.interface";

const TodoApp: React.FC = () => {
  const {
    checkedKeys,
    currentSelectedTodo,
    newSubTodoName,
    selectedKeys,
    setCurrentSelectedTodo,
    setSubNewTodoName,
    todos,
    onCheck,
    handleToggleTodo,
    onSelect,
    handleDeleteTodo,
    handleAddSubTodo,
    setIsError,
  } = useTodos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showModal = useCallback(
    (todo: Todo) => {
      setCurrentSelectedTodo(todo);
      setIsModalOpen(true);
    },
    [setCurrentSelectedTodo]
  );

  const handleOk = () => {
    handleAddSubTodo((currentSelectedTodo as Todo)?.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModal = useCallback(
    (todo: Todo) => {
      setShowDeleteModal(true);
      setCurrentSelectedTodo(todo);
    },
    [setCurrentSelectedTodo]
  );

  const handleOnOKDeleteModal = () => {
    handleDeleteTodo(currentSelectedTodo?.id as string);
    setShowDeleteModal(false);
  };

  const handleOnCancelDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const convertResponseToTodoList = useCallback(
    (data: Todo[]) => {
      const convertTodo = (todo: any) => {
        return {
          title: (
            <TodoNode
              todo={todo}
              checkedKeys={checkedKeys}
              handleDeleteModal={handleDeleteModal}
              showModal={showModal}
            />
          ),
          key: todo.id,
          children: todo.subTodos ? todo.subTodos.map(convertTodo) : [],
        };
      };

      return data.map(convertTodo);
    },
    [checkedKeys, handleDeleteModal, showModal]
  );

  const treeData = useMemo(
    () => convertResponseToTodoList(todos),
    [convertResponseToTodoList, todos]
  );

  useEffect(() => {
    setLocalStorageItem(LOCAL_KEYS.USER_TASKS, todos);
  }, [todos, handleToggleTodo]);

  const handleOnChangeSubtaskName = (value: string) => {
    if (value.trim() === "") {
      setIsError(true);
    } else {
      setIsError(false);
      setSubNewTodoName(value);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center">
      <div className="p-8 flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
        <Row gutter={16} align="middle">
          <Col span={12}>
            <AddTodo />
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Todos completed"
                value={checkedKeys?.length ?? 0}
                precision={2}
                suffix={`/ ${countTotalData(todos)}`}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      {todos.length > 0 ? (
        <Card className="mb-20">
          <Tree
            rootStyle={{
              color: "black",
              fontSize: "12px",
            }}
            className="nested-tree"
            checkable
            checkStrictly
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
            showLine
            switcherIcon={<DownOutlined className="text-bold" />}
            blockNode
            autoExpandParent
          />
        </Card>
      ) : (
        <NoTodo />
      )}

      <AddTodoModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        InputValue={newSubTodoName}
        handleOnChangeInputValue={handleOnChangeSubtaskName}
        currentSelectedTodo={currentSelectedTodo as Todo}
      />
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
