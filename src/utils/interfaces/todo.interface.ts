export interface Todo {
  dateOfCreation: string;
  id: string;
  isChecked: boolean;
  name: string;
  subTodos: Todo[];
  pos: string
}

export interface TodoList {
  todos: Todo[];
}
