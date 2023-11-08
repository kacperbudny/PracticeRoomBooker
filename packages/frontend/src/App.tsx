import { FormEvent } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import styled from "styled-components";

function App() {
  const handleSubmit = (e: FormEvent) => {
    console.log(e);
  };

  return (
    <Center>
      <WidthContainer>
        <Segment padded>
          <Header as="h2">Zaloguj się</Header>
          <Form onSubmit={handleSubmit}>
            <Form.Input label="E-mail" placeholder="E-mail" type="email" />
            <Form.Input label="Hasło" placeholder="Hasło" type="password" />
            <Button type="submit" color="teal" fluid>
              Zaloguj się
            </Button>
          </Form>
        </Segment>
      </WidthContainer>
    </Center>
  );
}

export default App;

const Center = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const WidthContainer = styled.div`
  width: 100%;
`;
