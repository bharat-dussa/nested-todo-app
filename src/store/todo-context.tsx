import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Todo } from "../utils/interfaces/todo.interface";
import { LOCAL_KEYS, getLocalStorageItem } from "../utils/local-storage.util";
import {
  deleteTodoRecursively,
  extractCheckedIds,
  generateId,
  handleAddSubTodoRecursively,
  toggleTodoRecursively,
} from "../utils/common.utils";

interface TodoContextType {
  checkedKeys: React.Key[];
  currentSelectedTodo: Todo | undefined;
  newSubTodoName: string;
  newTodoName: string;
  selectedKeys: React.Key[];
  setCheckedKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  setCurrentSelectedTodo: React.Dispatch<
    React.SetStateAction<Todo | undefined>
  >;
  setNewTodoName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  setSubNewTodoName: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  handleAddTodo: () => void;
  onCheck: (checkedKeysValue: any, { node }: any) => void;
  handleToggleTodo: (todoId: string) => void;
  onSelect: (selectedKeysValue: React.Key[], info: any) => void;
  handleDeleteTodo: (todoId: string) => void;
  handleAddSubTodo: (parentId: string) => void;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within an TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    getLocalStorageItem(LOCAL_KEYS.USER_TASKS) || []
  );
  const [newTodoName, setNewTodoName] = useState("");
  const [newSubTodoName, setSubNewTodoName] = useState("");
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [currentSelectedTodo, setCurrentSelectedTodo] = useState<Todo>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const [isError, setIsError] = useState(false);

  const handleAddTodo = () => {
    if (newTodoName.trim() === "") {
      setIsError(true);
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

  const handleToggleTodo = useCallback(
    (todoId: string) => {
      setTodos((prevTodos) => {
        return toggleTodoRecursively(prevTodos, todoId);
      });
    },
    [setTodos]
  );

  const onCheck = (checkedKeysValue: any, { node }: any) => {
    const { key } = node;
    const checkedTodoIds = checkedKeysValue.checked || [];

    handleToggleTodo(key);
    setCheckedKeys(checkedTodoIds);
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
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  const handleDeleteTodo = useCallback(
    (todoId: string) => {
      setTodos((prevTodos) => {
        return deleteTodoRecursively(prevTodos, todoId);
      });
      setCheckedKeys(extractCheckedIds());
    },

    []
  );

  useEffect(() => {
    setCheckedKeys(extractCheckedIds());
  }, [todos]);

  const todoProps: TodoContextType = {
    checkedKeys,
    currentSelectedTodo,
    handleAddSubTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    isError,
    newSubTodoName,
    newTodoName,
    onCheck,
    onSelect,
    selectedKeys,
    setCheckedKeys,
    setCurrentSelectedTodo,
    setIsError,
    setNewTodoName,
    setSelectedKeys,
    setSubNewTodoName,
    setTodos,
    todos,
  };

  return (
    <TodoContext.Provider value={todoProps}>{children}</TodoContext.Provider>
  );
};
