// // import React, { Component } from "react";
// // import React from "react";
import React from "react";
// import { Query } from "@apollo/react-components";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
// import plus from "./plus.png";
import "./addtodo.css";

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export class addtodo extends React.Component {
  render() {
    let input;
    return (
      <div>
        <Mutation mutation={ADD_TODO}>
          {(addTodo, { data }) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addTodo({ variables: { title: input.value } });
                  input.value = "";
                }}
              >
                <input
                  className="inputtext"
                  ref={node => {
                    input = node;
                  }}
                />
                <button className="buttonaddnew" type="submit">
                  Add-Todo
                </button>
                {/* <img
                  type="submit"
                  src={plus}
                  alt="todolist"
                  className="buttonaddnew"
                /> */}
              </form>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}
export default addtodo;
