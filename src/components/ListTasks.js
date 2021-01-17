import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";

const ListTasks = (props) => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("List")) || []
  );
  useEffect(() => {
    window.localStorage.setItem("List", JSON.stringify(todos)); // save todos to localStorage
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.title) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((el) => el.id != index));
  };

  const changeDone = (index) => {
    setTodos(
      todos.map((el) => (el.id == index ? { ...el, done: !el.done } : el))
    );
  };

  const displayEditTodo = (index) => {
    setTodos(
      todos.map((el) => (el.id == index ? { ...el, edit: !el.edit } : el))
    );
  };

  const editTodo = (todo) => {
    setTodos(
      todos.map((el) => (el.id == todo.id ? { ...todo, edit: false } : el))
    );
  };

  return (
    <div style={{ padding: "50px" }}>
      <h3>List des taches</h3>
      <ListGroup>
        {todos && todos.length ? (
          todos.map((el) => (
            <ListGroupItem
              key={el.id}
              className="d-flex justify-content-between align-items-center"
            >
              {el.edit ? (
                <EditTask Todo={el} editTodo={editTodo} />
              ) : (
                <>
                  <div>
                    <span className="font-weight-bold pr-2">{el.title} </span>
                    {el.description}
                    <span> -</span>
                    <Button onClick={() => displayEditTodo(el.id)} color="link">
                      Modifier
                    </Button>
                    <Button onClick={() => deleteTodo(el.id)} color="link">
                      Supprimer
                    </Button>
                  </div>
                  <Badge
                    className="badge"
                    color={el.done ? "success" : "danger"}
                    pill
                    onClick={() => changeDone(el.id)}
                  >
                    {el.done ? "complétée" : "Non complétée"}
                  </Badge>
                </>
              )}
            </ListGroupItem>
          ))
        ) : (
          <h2 className="empty-list">liste de tâches vide.</h2>
        )}
      </ListGroup>
      <hr />
      <NewTask addTodo={addTodo} />
    </div>
  );
};

const NewTask = (props) => {
  const [inputs, setInputs] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    edit: false,
    done: false,
  });
  const { title, description } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleReset(e) {
    setInputs({
      id: uuidv4(),
      title: "",
      description: "",
      done: false,
    });
  }

  return (
    <div>
      <h3>Créer une nouvelle tâche</h3>
      <Form className="d-flex align-items-center pt-3">
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="title" className="mr-sm-2">
            Nom de la tâche
          </Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="description" className="mr-sm-2">
            Description de la tâche en une ligne
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          onClick={() => {
            props.addTodo(inputs);
            handleReset();
          }}
          style={{ marginTop: "28px" }}
          color="primary"
        >
          Ajouter la tâche
        </Button>
      </Form>
    </div>
  );
};

const EditTask = (props) => {
  const [inputs, setInputs] = useState({});
  const { title, description } = inputs;
  const { Todo } = props;

  useEffect(() => {
    setInputs(Todo);
  }, [props.Todo]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  return (
    <Form className="d-flex align-items-center">
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleChange}
        />
      </FormGroup>
      <Button
        color="primary"
        onClick={() => {
          props.editTodo(inputs);
        }}
      >
        Enregistrer
      </Button>
    </Form>
  );
};

export default ListTasks;
