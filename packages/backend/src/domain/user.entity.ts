type UserProps = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export class User {
  id: string;
  username: string;
  email: string;
  password: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
  }
}
