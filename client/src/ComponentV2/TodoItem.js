import React, { Component } from "react";
import "./Checkbox.css";
export class TodoItem extends Component {
  render() {
    const { title, id } = this.props;
    return (
      // <li class="list-item">
      //   <input type="checkbox" class="hidden-box" id={id} />
      //   <label for={id} class="check--label">
      //     <span class="check--label-box"></span>
      //     <span class="check--label-text">{title}</span>
      //     <div className="todo-icon justify-content-end ">
      //       <span className="mx-2 text-success">
      //         <i className="fas fa-pen" />
      //       </span>
      //       <span className="mx-2 text-danger">
      //         <i className="fas fa-trash" />
      //       </span>
      //     </div>
      //   </label>
      // </li>
      // แสดง Listitem ของ Todo
      <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
        <input type="checkbox" />
        <span class="checkmark"></span>
        <input type="text" />
        <h6>{title}</h6>
        <div className="todo-icon">
          <span className="mx-2 text-success">
            <i className="fas fa-pen" />
          </span>
          <span className="mx-2 text-danger" onClick={handleDelete}>
            <i className="fas fa-trash" />
          </span>
        </div>
      </li>
    );
  }
}

export default TodoItem;
