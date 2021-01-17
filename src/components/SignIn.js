import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { Container, Row, Col } from "reactstrap";

function SignIn(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (email === "test@test.com" && password === "test") {
      localStorage.setItem("login", true);
      props.history.push("/list-tasks");
    }
  }

  return (
    <Form style={{ padding: "100px" }} onSubmit={handleSubmit}>
      <Container className="signIn">
        <FormGroup>
          <Label for="exampleEmail">Adresse e-mail</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Entrez votre adresse email"
            value={email}
            onChange={handleChange}
            invalid={email && email !== "test@test.com"}
          />
          <FormFeedback>Adresse e-mail invalide!!</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Mot de passe</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Entrez votre Mot de passe"
            value={password}
            onChange={handleChange}
            invalid={password !== "test" && password}
          />
          <FormFeedback>Mot de passe invalide!!</FormFeedback>
        </FormGroup>
        <Button type="submit" color="primary">
          Soumettre
        </Button>
      </Container>
    </Form>
  );
}

export default SignIn;
