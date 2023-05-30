import React, { useState } from "react";

interface Todo {
  id: string;
  name: string;
  isChecked: boolean;
  subTodos: Todo[];
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");


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
        // Skip the current todo and its sub-todos
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
    const subTodoName = prompt("Enter SubTodo name:");
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
      <li key={todo.id} className="pl-4 py-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.isChecked}
            onChange={() => handleToggleTodo(todo.id)}
            className="mr-2"
          />
          <span className={todo.isChecked ? "line-through" : ""}>
            {todo.name}
          </span>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
        
        <div className="pl-8">
        {todo.subTodos.length > 0 && (
          <ul>{todo.subTodos.map((subTodo) => renderTodo(subTodo))}</ul>
        )}
          <input
            type="text"
            className="text-sm text-blue-500 hover:text-blue-700"
            placeholder="Add SubTodo"
            onChange={(e) => handleNewSubTodoChange(e, todo.id)}
          />
          <button onClick={() => handleAddSubTodo(todo.id)}>Add</button>
        </div>
      </li>
    );
  };

  const handleNewSubTodoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentId: string
  ) => {
    // Add your logic to handle the input change for sub-todo
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div>
        <input
          type="text"
          className="border-primary-600 bg-grey"
          value={newTodoName}
          placeholder="Enter Todo"
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>{todos.map((todo) => renderTodo(todo))}</ul>
    </div>
  );
};

export default TodoApp;
