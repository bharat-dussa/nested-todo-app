export interface User {
  address: string;
  dateOfBirth: string;
  email: string;
  password: string;
  gender: string;
  name: string;
  phoneNumber: string;
  accessToken?: string;
}

export interface Login {
    email: User['email'],
    password: User['password']
}
