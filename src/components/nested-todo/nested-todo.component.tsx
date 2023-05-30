import React, { useState } from "react";
import NoTodo from "../not-todo/not-todo.component";
import DialogInput from "../dialog/dialog.component";
import AddTodo from "../common/add-todo.component";

interface Todo {
  id: string;
  name: string;
  isChecked: boolean;
  subTodos: Todo[];
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newSubTodoName, setSubNewTodoName] = useState("");

  const [showSubTodoModal, setShowSubTodoModal] = useState(false);

  const handleCloseModal = () => {
    setShowSubTodoModal(false);
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

  const toggleTodoRecursively = (todos: Todo[], todoId: string): Todo[] => {
    return todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isChecked: !todo.isChecked };
      } else if (todo.subTodos.length > 0) {
        return {
          ...todo,
          subTodos: toggleTodoRecursively(todo.subTodos, todoId),
        };
      } else {
        return todo;
      }
    });
  };

  const handleToggleTodo = (todoId: string) => {
    setTodos((prevTodos) => {
      return toggleTodoRecursively(prevTodos, todoId);
    });
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos((prevTodos) => {
      return deleteTodoRecursively(prevTodos, todoId);
    });
  };

  const deleteTodoRecursively = (todos: Todo[], todoId: string): Todo[] => {
    let updatedTodos: Todo[] = [];

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];

      if (todo.id === todoId) {
        continue;
      }

      const updatedSubTodos = deleteTodoRecursively(todo.subTodos, todoId);

      updatedTodos.push({
        ...todo,
        subTodos: updatedSubTodos,
      });
    }

    return updatedTodos;
  };

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
    setShowSubTodoModal(false);
  };

  const handleAddSubTodoRecursively = (
    subTodos: Todo[],
    parentId: string,
    newSubTodo: Todo
  ): Todo[] => {
    return subTodos.map((subTodo) => {
      if (subTodo.id === parentId) {
        return {
          ...subTodo,
          subTodos: [...subTodo.subTodos, newSubTodo],
        };
      } else if (subTodo.subTodos.length > 0) {
        return {
          ...subTodo,
          subTodos: handleAddSubTodoRecursively(
            subTodo.subTodos,
            parentId,
            newSubTodo
          ),
        };
      } else {
        return subTodo;
      }
    });
  };

  const generateId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  console.log("todos:", todos);

  const renderTodo = (todo: Todo) => {
    return (
      <li key={todo.id} className="pl-4 py-2 border p-8">
        <div className="flex items-center gap-4 justify-between">
          <div>
            <input
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => handleToggleTodo(todo.id)}
              className="mr-2"
            />
            <span
              className={todo.isChecked ? "line-through text-slate-400" : ""}
            >
              {todo.name}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-red-400	text-white p-1 px-3 rounded-md"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
            <button
              className="bg-primary-600	text-white p-1 px-3 rounded-md"
              onClick={() => setShowSubTodoModal(true)}
            >
              Add sub todo
            </button>
          </div>
        </div>

        <div className="pl-8">
          {todo.subTodos.length > 0 && (
            <ul>{todo.subTodos.map((subTodo) => renderTodo(subTodo))}</ul>
          )}
          <DialogInput
            handleCloseModal={handleCloseModal}
            visible={showSubTodoModal}
            dataFor={todo.name}
            todoName={newSubTodoName}
            onClickAddTodo={() => handleAddSubTodo(todo.id)}
            onChangeAddTodo={(value) => setSubNewTodoName(value)}
          />
        </div>
      </li>
    );
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
        <div className="max-w-md max-w-auto mt-8">
          <ul className="space-y-4">{todos.map((todo) => renderTodo(todo))}</ul>
        </div>
      ) : (
        <NoTodo />
      )}
    </div>
  );
};

export default TodoApp;
