import { Todo } from "./todo.interface";

export interface User {
  address: string;
  dateOfBirth: string;
  email: string;
  password: string;
  gender: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
  todos: Todo[]
}

export interface Login {
    email: User['email'],
    password: User['password']
}
