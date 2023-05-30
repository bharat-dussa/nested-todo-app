import React, { useState } from "react";
import { Todo } from "../../utils/interfaces/todo.interface";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");

  const handleAddTodo = (parentId: string | null) => {
    console.log('parentId:', parentId, todos);
    if (newTodoName.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      dateOfCreation: getCurrentDate(),
      id: generateId(),
      name: newTodoName,
      isChecked: false,
      subTodos: [],
      pos: "0"
    };

    if (parentId) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === parentId) {
          return {
            ...todo,
            subTodos: [...todo.subTodos, newTodo],
          };
        }
        return todo;
      });

      setTodos(updatedTodos);
    } else {
      setTodos([...todos, newTodo]);
    }
  };


  const handleAddSubTodo = (parentId: string) => {
    
    handleAddTodo(parentId);
  };

  const handleDeleteTodo = (parentId: string | null, todoId: string) => {
    if (parentId) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === parentId) {
          return {
            ...todo,
            subTodos: todo.subTodos.filter((subTodo) => subTodo.id !== todoId),
          };
        }
        return todo;
      });

      setTodos(updatedTodos);
    } else {
      setTodos(todos.filter((todo) => todo.id !== todoId));
    }
  };

  const handleToggleTodo = (parentId: string | null, todoId: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parentId) {
        return {
          ...todo,
          subTodos: todo.subTodos.map((subTodo) => {
            if (subTodo.id === todoId) {
              return {
                ...subTodo,
                isChecked: !subTodo.isChecked,
              };
            }
            return subTodo;
          }),
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const renderTodo = (todo: Todo, parentId: string | null) => {
    return (
      <li key={todo.id} className="pl-4 py-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.isChecked}
            onChange={() => handleToggleTodo(parentId, todo.id)}
            className="mr-2"
          />
          <span className={todo.isChecked ? "line-through" : ""}>
            {todo.name}
          </span>
        </div>
        <div className="pl-8">
          {todo.subTodos.length > 0 && (
            <ul>
              {todo.subTodos.map((subTodo) => renderTodo(subTodo, todo.id))}
            </ul>
          )}
          <button
            className="text-sm text-blue-500 hover:text-blue-700"
            onClick={() => handleAddSubTodo(todo.id)}
          >
            Add SubTodo
          </button>
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => handleDeleteTodo(parentId, todo.id)}
          >
            Delete
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-6">
        <input
          className="border-primary-600 bg-grey"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          type="text"
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => handleAddTodo(null)}
        >
          Add Todo
        </button>
      </div>

      <ul>{todos.map((todo) => renderTodo(todo, null))}</ul>
    </div>
  );
};

export default TodoList;
