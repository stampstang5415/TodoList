import React, {Component} from "react";
import "./Checkbox.css";
import Editform from "./Editform.js";
import {Mutation, Query} from "@apollo/react-components";
import { useQuery,useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const TODOLIST_QUERY = gql`
    query TodoListQuery($sort: String) {
        getTodoList(sort: $sort) {
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
function TodoItem(props){
  // constructor(props) {
  //   super(props);
  //   this.state = {new_Title: "", count_Display: false };
  //   this.handleChangeTitle = this.handleChangeTitle.bind(this);
  //   this.myEdit = React.createRef();
  // }

  // handleChangeTitle(event) {
  //   this.setState({new_Title: event.target.value});
  // }

  // handleEnterPressed = event => {
  //   if (event.key === "Enter") {
  //     console.log("Submit");
  //     event.currentTarget.value = "";
  //     this.setState({count_Display: true });
  //   }
  // };
    const {editStatus,editTitle,reverseCounter} = this.props;
    return (
      <Query query={TODOLIST_QUERY} variables={ { sort: reverseCounter} }   >
        {({loading, error, data  }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return  data.getTodoList.map(({id, title, completed}) => {
            const handleUpdateStatus = event => {
              event.preventDefault();

              editStatus({variables: {id, completed: event.target.checked}});
            };
            const handleUpdateTitle = event => {
              event.preventDefault();
              editTitle({variables: {id, title: this.state.new_Title}});
            };
            return (
              <div className="row" key={id}>
                  <input
                    type="checkbox" className="hidden-box" id={title} checked={completed}
                    onChange={handleUpdateStatus}
                  />
                  <label htmlFor={title} className="check--label">
                    <span className="check--label-box"/>
                    <span className="check--label-text">{title}</span>
                        <form
                          ref={this.myEdit}
                          onSubmit={handleUpdateTitle}
                        >
                          <Editform count_Display={this.state.count_Display} handleChangeTitle={this.handleChangeTitle}  handleEnterPressed={this.handleEnterPressed} />
                        </form>
                    <div className="todo-icon justify-content-end ">
                      <Mutation
                        mutation={REMOVE_TODO}
                        refetchQueries={() => [{ query: TODOLIST_QUERY, variables: { sort: "Newest" } },{ query: TODOLIST_QUERY, variables: { sort: "Oldest" } }]}
                      >
                        {removeTodo => (
                          <form onSubmit={e => {
                            e.preventDefault();
                            removeTodo({variables: {id: id}});
                            console.log("detele");
                          }}>
                      <button type="submit" className="mx-2 text-danger"><i className="fas fa-trash" /></button>
                            </form>
                        )}
                      </Mutation>
                    </div>
                  </label>
              </div>

            );
          })
            ;
        }}
      </Query>
    );
}

export default TodoItem;
