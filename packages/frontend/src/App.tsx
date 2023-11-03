import { Button, Form, Header, Segment } from "semantic-ui-react";

function App() {
  const handleSubmit = () => {
    console.log("test");
  };

  return (
    <>
      <Segment>
        <Header as="h2">Zaloguj się</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input label="E-mail" placeholder="E-mail" type="email" />
          <Form.Input label="Hasło" placeholder="Hasło" type="password" />
          <Button type="submit">Zaloguj się</Button>
        </Form>
      </Segment>
    </>
  );
}

export default App;
