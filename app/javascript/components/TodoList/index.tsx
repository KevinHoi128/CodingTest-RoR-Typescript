import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios from "axios";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const [todoList, setTodoList] = useState([...todoItems])

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    const newCheckedState = e.target.checked
    axios.post("/todo", {
      id: todoItemId,
      checked: newCheckedState,
    }).then(() => {
      setTodoList(list => {
        return list.map(listItem => {
          if (listItem.id === todoItemId) {
            listItem.checked = newCheckedState;
          }
          return listItem
        })
      })
    })
  };
  

  const resetButtonOnClick = (): void => {
    axios.post("/reset").then(response => {
      setTodoList(response.data)
    });
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todoList.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo.id)}
            />
          </ListGroup.Item>
        ))}
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
