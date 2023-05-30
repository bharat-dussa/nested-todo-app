import { Todo } from "./interfaces/todo.interface";
import { LOCAL_KEYS, getLocalStorageItem } from "./local-storage.util";

export const generateId = (): string => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const deleteTodoRecursively = (
  todos: Todo[],
  todoId: string
): Todo[] => {
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

export const toggleTodoRecursively = (
  todos: Todo[],
  todoId: string
): Todo[] => {
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

export const extractCheckedIds = (_todos?: Todo[]) => {
  let checkedIds: string[] = [];
  const todos = !_todos
    ? (getLocalStorageItem(LOCAL_KEYS.USER_TASKS) as Todo[])
    : _todos;

  todos.forEach((todo) => {
    if (todo.isChecked) {
      checkedIds.push(todo.id);
    }

    if (todo.subTodos) {
      const subCheckedIds = extractCheckedIds(todo.subTodos);
      checkedIds = checkedIds.concat(subCheckedIds);
    }
  });

  return checkedIds;
};

export const handleAddSubTodoRecursively = (
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

export const countTotalData = (data: Todo[]) => {
  let count = 0;

  const traverse = (items: Todo[]) => {
    count += items.length;

    for (let i = 0; i < items.length; i++) {
      const subTodos = items[i].subTodos;
      if (subTodos.length > 0) {
        traverse(subTodos);
      }
    }
  };

  traverse(data);

  return count;
};
