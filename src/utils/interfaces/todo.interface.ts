export interface Todo {
  dateOfCreation: string;
  id: string;
  isChecked: boolean;
  name: string;
  subTodos: Todo[];
}

export interface TodoList {
  todos: Todo[];
}
