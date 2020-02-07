import React, {useState} from "react";
import TodoItem from "./TodoItem.js";
import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";
import styled from "styled-components";

const ADD_TODO = gql`
    mutation AddTodo($title: String!) {
        addTodo(title: $title) {
            id
            title
            completed

        }
    }
`;
const TODOLIST_QUERY = gql`
    query TodoListQuery($sort: String) {
        getTodoList(sort: $sort) {
            id
            title
            completed

        }
    }
`;
const UPDATE_TITLE = gql`
    mutation EditTitle($id: ID!, $title: String!) {
        editTitle(id: $id, title: $title) {
            id
            title
            completed

        }
    }
`;
const UPDATE_STATUS = gql`
    mutation EditStatus($id: ID!, $completed: Boolean!) {
        editStatus(id: $id, completed: $completed) {
            id
            title
            completed

        }
    }
`;
const REMOVE_TODO = gql`
    mutation EditStatus($id: ID!) {
        removeTodo(id: $id) {
            id
            title
            completed

        }
    }
`;

function TodoInput() {
  const [new_todo, setNew_todo] = useState("");
  const [reverseList, setReverseList] = useState("Oldest");

  // const { loading, error, data } = useQuery(TODOLIST_QUERY, {
  //   variables: { sort: reverseList },});
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{query: TODOLIST_QUERY, variables: {sort: "Newest"}}, {
      query: TODOLIST_QUERY,
      variables: {sort: "Oldest"}
    }],
    awaitRefetchQueries: true,
  });
  const [editTitle] = useMutation(UPDATE_TITLE);
  const [editStatus] = useMutation(UPDATE_STATUS);
  const [removeTodo] = useMutation(REMOVE_TODO, {
    refetchQueries: [{query: TODOLIST_QUERY, variables: {sort: "Newest"}}, {
      query: TODOLIST_QUERY,
      variables: {sort: "Oldest"}
    }],
    awaitRefetchQueries: true,
  });

  const handleChange = (event) => {
    setNew_todo(event.target.value);
  };
  const handleEnterPressed = (event) => {
    event.preventDefault();
    if (new_todo !== "") {
      addTodo({variables: {title: new_todo}}).then(() => setNew_todo(""));
    }
  };
  const reverseTodo = () => {
    if (reverseList === "Newest") {
      setReverseList("Oldest");
    } else {
      setReverseList("Newest");
    }
  };
  return (
    <Card>
      <form onSubmit={handleEnterPressed}>
        <InputGroup>
          <BoxIcon>
            <i className="fas fa-book"/>
          </BoxIcon>
          <InputText
            type="text"
            onChange={handleChange}
            value={new_todo}/>
          <BoxIcon onClick={reverseTodo}>
            <i className="fas fa-retweet"/>
          </BoxIcon>
        </InputGroup>
      </form>
      <Time>{reverseList}</Time>
      <TodoItem
        reverseList={reverseList}
        removeTodo={removeTodo}
        editTitle={editTitle}
        editStatus={editStatus}/>
    </Card>
  );
}

const Card = styled.div`
    padding: 1rem!important;
    margin-bottom: 1rem!important;
    margin-top: 1rem!important;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 15px;
    background-color: white; 
`;
const Time = styled.h4`
    margin-top: .5rem!important;
`;
const InputGroup = styled.div`
    display: flex;
    justify-content: center;
`;
const BoxIcon = styled.div`
    background-color: #F96519;
    color: #fff!important;
    align-items: center;
    padding: .375rem .75rem;
    margin-bottom: 0;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    text-align: center;
`;
const InputText = styled.input`
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
`;

export default TodoInput;
