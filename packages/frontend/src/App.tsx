import { ChangeEvent, useState } from "react";
import {
  Button,
  Form,
  Header,
  InputOnChangeData,
  Segment,
} from "semantic-ui-react";
import styled from "styled-components";

function App() {
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleChange = (
    _: ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Center>
      <WidthContainer>
        <Segment padded>
          <Header as="h2">Zaloguj się</Header>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="E-mail"
              placeholder="E-mail"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <Form.Input
              label="Hasło"
              placeholder="Hasło"
              type="password"
              name="password"
              onChange={handleChange}
            />
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
  padding: 16px;
`;
