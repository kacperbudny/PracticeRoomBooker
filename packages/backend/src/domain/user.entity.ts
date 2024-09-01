type Role = "user" | "admin";

type UserProps = {
  id: string;
  password: string;
  email: string;
  role: Role;
};

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
}
