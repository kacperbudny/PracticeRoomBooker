type Role = "user" | "admin";

type UserProps = {
  id: string;
  username: string;
  email: string;
  role: Role;
};

export class User {
  id: string;
  username: string;
  email: string;
  role: Role;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.role = props.role;
  }
}
