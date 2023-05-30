import { Todo } from "./interfaces/todo.interface";
import { LOCAL_KEYS, getLocalStorageItem } from "./local-storage.util";

export const generateId = (): string => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const deleteTodoRecursively = (
  todos: Todo[] | undefined,
  todoId: string
): Todo[] => {
  if (!Array.isArray(todos) || typeof todoId !== "string") {
    throw new Error("Invalid parameters");
  }
  const updatedTodos = todos.reduce((acc: Todo[], todo: Todo) => {
    if (todo.id === todoId) {
      return acc;
    }
    const updatedSubTodos = deleteTodoRecursively(todo.subTodos, todoId);
    return [
      ...acc,
      {
        ...todo,
        subTodos: updatedSubTodos,
      },
    ];
  }, []);

  return updatedTodos;
};
export const toggleTodoRecursively = (
  todos: Todo[] | undefined,
  todoId: string
): Todo[] => {
  if (!Array.isArray(todos) || typeof todoId !== "string") {
    throw new Error("Invalid parameters");
  }

  const updatedTodos = todos.map((todo: Todo) => {
    if (todo.id === todoId) {
      return { ...todo, isChecked: !todo.isChecked };
    } else if (todo.subTodos.length > 0) {
      const updatedSubTodos = toggleTodoRecursively(todo.subTodos, todoId);
      return {
        ...todo,
        subTodos: updatedSubTodos,
      };
    } else {
      return todo;
    }
  });

  return updatedTodos;
};

export const extractCheckedIds = (
  todos: Todo[] = getLocalStorageItem(LOCAL_KEYS.USER_TASKS) as Todo[]
): string[] => {
  return todos.reduce((checkedIds: string[], todo: Todo) => {
    if (todo.isChecked) {
      checkedIds.push(todo.id);
    }

    if (todo.subTodos) {
      const subCheckedIds = extractCheckedIds(todo.subTodos);
      checkedIds = checkedIds.concat(subCheckedIds);
    }

    return checkedIds;
  }, []);
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

export const countTotalData = (data: Todo[]): number => {
  let count = data.length;

  data.forEach((todo) => {
    count += countTotalData(todo.subTodos);
  });

  return count;
};
