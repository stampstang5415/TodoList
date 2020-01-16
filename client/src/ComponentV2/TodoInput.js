import React, { Component } from "react";
import TodoItem from "./TodoItem.js";

export class TodoInput extends Component {
  render() {
    return (
      <div className="card card-body my-3">
        <form>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white">
                <i className="fas fa-book"></i>
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="add a Todo item"
            />
          </div>
          <button type="submit" className="btn btn-block btn-primary mt-3">
            add item
          </button>
          <TodoItem />
        </form>
      </div>
    );
  }
}

export default TodoInput;
