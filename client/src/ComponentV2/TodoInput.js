import React, { Component } from "react";
import TodoItem from "./TodoItem.js";
import { Query, Mutation } from "@apollo/react-components";
import gql from "graphql-tag";

const TODOLIST_QUERY = gql`
  query TodoListQuery {
    getTodoList {
      id
      title
      completed
    }
  }
`;
const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;
export class TodoInput extends Component {
  //ส่วน input รับค่า addtodo ส่งไป Mutations
  render() {
    const {
      item,
      // items,
      handleChange
      // handleSubmit
      //   handleDelete
    } = this.props;
    return (
      <div className="card card-body my-3">
        <Mutation mutation={ADD_TODO}>
          {(addTodo, { data }) => (
            <form
              onSubmit={e => {
                e.preventDefault();
                addTodo({ variables: { title: input.value } });
                input.value = "";
              }}
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-primary text-white">
                    <i className="fas fa-book"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control inputtext"
                  // placeholder="add a Todo item"
                  ref={node => {
                    input = node;
                  }}
                />
              </div>
            </form>
          )}
        </Mutation>
        {/* <button type="submit" className="btn btn-block btn-primary mt-3">
            add item
          </button> */}
        {/* เรียกcomponent TodoItem แสดงlistไอเทม */}
        <Query query={TODOLIST_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            // console.log(data);
            // return <h1>test</h1>;
            return data.getTodoList.map(({ id, title, completed }) => (
              <div>
                <TodoItem key={id} title={title} completed={completed} />
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default TodoInput;
