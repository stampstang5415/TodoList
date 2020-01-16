import React, { Component } from "react";
import TodoItem from "./TodoItem.js";
export class TodoList extends Component {
  render() {
    return (
      <ul className="list-group my-5">
        <h3 className="text-capitalize text-center">todo list</h3>
        <TodoItem />
        <button
          type="button"
          className="btn btn-danger btn-block text-capitalize mt-5"
        >
          clear list
        </button>
      </ul>
    );
  }
}

export default TodoList;
