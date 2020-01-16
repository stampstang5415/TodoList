import React, { Component } from "react";
import "./Checkbox.css";
export class TodoItem extends Component {
  render() {
    return (
      <li class="list-item">
        <input type="checkbox" class="hidden-box" id="first" />
        <label for="first" class="check--label">
          <span class="check--label-box"></span>
          <span class="check--label-text">First Checkbox</span>
        </label>
      </li>
      // <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
      //   <input type="checkbox" />
      //   <h6>cat dog rat ant egg ox kig</h6>
      //   <div className="todo-icon">
      //     <span className="mx-2 text-success">
      //       <i className="fas fa-pen" />
      //     </span>
      //     <span className="mx-2 text-danger">
      //       <i className="fas fa-trash" />
      //     </span>
      //   </div>
      // </li>
    );
  }
}

export default TodoItem;
