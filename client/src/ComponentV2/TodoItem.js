import React, {useState} from "react";
import EditTitle from "./EditTitle.js";
import {useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";
import styled from "styled-components";
import Checkbox from './Checkbox'

const TODOLIST_QUERY = gql`
    query TodoListQuery($sort: String) {
        getTodoList(sort: $sort) {
            id
            title
            completed

        }
    }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;
const UpdateTitle = styled.form`
  margin-left: auto;
`;
const DeleteButton = styled.button`
    background-color: #dc3545!important;
    border-radius: 20px;
    color: #fff!important;
    margin-top: 7px;
    margin-left: .5rem!important;
    margin-right: .5rem!important;
    border-color: brown;
`;

function TodoItem(props) {
  const [new_Title, setNew_Title] = useState("");
  const [count_Display, setCount_Display] = useState(false);

  const handleChangeTitle = (event) => {
    setNew_Title(event.target.value);
  };
  const handleEnterPressed = (event) => {
    if (event.key === "Enter") {
      console.log("Submit");
      event.currentTarget.value = "";
      setCount_Display(true);
    }
  };

  const {editStatus, editTitle, reverseList, removeTodo} = props;
  const {loading, error, data} = useQuery(TODOLIST_QUERY, {
    variables: {sort: reverseList},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getTodoList.map(({id, title, completed}) => {
    const handleUpdateStatus = event => {
      event.preventDefault();
      editStatus({variables: {id, completed: event.target.checked}});
    };
    const handleUpdateTitle = event => {
      event.preventDefault();
      editTitle({variables: {id, title: new_Title}});
    };
    const handleRemoveTodo = event => {
      event.preventDefault();
      removeTodo({variables: {id: id}}).then(() => console.log("detele"));
    };
    return (
      <Row key={id}>
        <Checkbox
          checked={completed}
          title={title}
          id={id}
          handleUpdateStatus={handleUpdateStatus} />
                <UpdateTitle onSubmit={handleUpdateTitle}>
                  <EditTitle count_Display={count_Display}
                             handleChangeTitle={handleChangeTitle}
                             handleEnterPressed={handleEnterPressed}/>
                </UpdateTitle>
                  <form onSubmit={handleRemoveTodo}>
                    <DeleteButton type="submit" ><i
                      className="fas fa-trash "/>
                    </DeleteButton>
                  </form>
      </Row>

    );
  })
    ;
}

export default TodoItem;
