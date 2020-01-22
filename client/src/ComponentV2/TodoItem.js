import React, { Component } from "react";
import "./Checkbox.css";
export class TodoItem extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { Height: 0, Width: 0, elmnt };
  // }
  // getsize() {
  //   this.setState(state => ({
  //     Height: elmnt.offsetHeight,
  //     Width: elmnt.offsetWidth
  //   }));
  // }
  componentDidMount() {
    // this.elmnt = document.getElementById("list")(() => this.getsize(), 1000);
    // console.log(Height, "px");
    // console.log(Width, "px");
  }
  render() {
    const { title } = this.props;
    return (
      <li id="list" class="list-item">
        <input type="checkbox" class="hidden-box" id={title} />
        <label for={title} class="check--label">
          <span class="check--label-box"></span>
          <span class="check--label-text">{title}</span>
          <div className="todo-icon justify-content-end ">
            <span className="mx-2 text-success">
              <i className="fas fa-pen" />
            </span>
            <span className="mx-2 text-danger">
              <i className="fas fa-trash" />
            </span>
          </div>
        </label>
      </li>
      // แสดง Listitem ของ Todo
      // <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
      //   <input type="checkbox" />
      //   <span class="checkmark"></span>
      //   {/* <input type="text" /> */}
      //   <h6>{title}</h6>
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
