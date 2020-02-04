import React,{ useState } from "react";
import TodoItem from "./TodoItem.js";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

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
function TodoInput(){
  const [new_todo, setNew_todo] = useState("");
  const [reverseList, setReverseList] = useState("Oldest");
  const handleChange=(event)=> {
    setNew_todo(event.target.value);
  };
  const [addTodo] = useMutation(ADD_TODO,{refetchQueries: [{query: TODOLIST_QUERY, variables: { sort: "Newest" }},{query: TODOLIST_QUERY, variables: { sort: "Oldest" }}],
    awaitRefetchQueries: true,} );
  const [editTitle] = useMutation(UPDATE_TITLE);
  const [editStatus] = useMutation(UPDATE_STATUS);
  const handleEnterPressed =(event)=> {
    if (event.key === "Enter") {
      console.log("Submit");
      console.log("Before",event.currentTarget.value);
      event.currentTarget.value = "";
      // event.preventDefault();
      console.log("After",event.currentTarget.value);
    }
  };
  const reverseTodo=()=>{
    if ( reverseList === "Newest") {
      setReverseList("Oldest");
    }else {
      setReverseList("Newest");
    }
  };
    return (
      <div className="card card-body my-3">
            <form
              onSubmit={event => {
                event.preventDefault();
                if(new_todo !== ""){
                  addTodo({variables: {title: new_todo}}).then(() => "");
                }
              }}
            >
              <div className="input-group  ">
                <div className="input-group-prepend">
                  <div className="input-group-text m-0 bg-primary text-white">
                    <i className="fas fa-book"/>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control m-0 inputtext"
                  onChange={handleChange}
                  onKeyDown={handleEnterPressed}
                />
                <div className="input-group-text m-0 bg-primary text-white" onClick={reverseTodo } >
                  <i className="fas fa-retweet"  />
                </div>
              </div>
            </form>
        <div>
          <h3>{reverseList}</h3>
          <TodoItem reverseCounter={reverseList}  editTitle={editTitle} editStatus={editStatus}/>
        </div>
      </div>
    );
}

export default TodoInput;
