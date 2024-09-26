import { randomUUID } from "node:crypto";

type Role = "user" | "admin";

type UserProps = {
  id: string;
  password: string;
  email: string;
  role: Role;
};

type CreateUserProps = Omit<UserProps, "id">;

export class User {
  id: string;
  password: string;
  email: string;
  role: Role;

  constructor(props: UserProps) {
    this.id = props.id;
    this.password = props.password;
    this.email = props.email;
    this.role = props.role;
  }

  static create(props: CreateUserProps) {
    return new User({ ...props, id: randomUUID() });
  }
}
