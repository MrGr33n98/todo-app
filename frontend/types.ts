export type Role = 'user' | 'admin';

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  owner_id: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}
