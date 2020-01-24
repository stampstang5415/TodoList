import React, {Component} from "react";
import "./TodoItem.css";
// import "./Checkbox.css";
import {Query} from "@apollo/react-components";
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
export class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {new_Title: "", show_Display: false};
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    // this.handleChangeStatus = this.handleChangeStatus.bind(this);
    // this.handleEditTitle = this.handleEditTitle.bind(this);
    this.myEdit = React.createRef();
    this.myEditButton = React.createRef();
  }

  handleChangeTitle(event) {
    this.setState({new_Title: event.target.value});
  }

  handleEnterPressed = event => {
    if (event.key === "Enter") {
      console.log("Submit");
      event.currentTarget.value = "";

    }
  }
  handleEditTitle = event => {
    if (this.state.show_Display === false) {
      // event.preventDefault();
      this.myEditButton.current.style.display = "none";
      this.myEdit.current.style.display = "";
      this.setState({show_Display: true});
      console.log(this.myEdit.current.style.display);
    } else {
      // event.preventDefault();
      this.myEdit.current.style.display = "none";
      console.log(this.myEdit.current.style.display);
    }
  }
  handleHiddenEdit= event => {
    event.preventDefault();
    this.myEdit.current.style.display = "";
  }
  componentDidMount() {
    // this.myEdit.current.style.display = "none";
  }

  render() {
    const {editStatus,editTitle,removeTodo} = this.props

    return (
      <Query query={TODOLIST_QUERY}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          // console.log(data);
          // return <h1>test</h1>;
          return data.getTodoList.map(({id, title, completed}) => {
            const handleUpdateStatus = event => {
              event.preventDefault();
              editStatus({variables: {id, completed: event.target.checked}});
            }
            const handleUpdateTitle = event => {
              event.preventDefault();
              editTitle({variables: {id, title: this.state.new_Title}});
            }
            return (
              <div key={id}>
                <li id="list" className="list-item">
                  <input
                    type="checkbox" className="hidden-box" id={title} checked={completed}
                    onChange={handleUpdateStatus}
                  />
                  <label htmlFor={title} className="check--label">
                    <span className="check--label-box"/>
                    <span className="check--label-text">{title}</span>

                        <form
                          className="inputEdit"
                          ref={this.myEdit}
                          onSubmit={handleUpdateTitle}
                        >
                          <input
                            // value={this.state.new_Title}
                            onChange={this.handleChangeTitle}
                            onKeyDown={this.handleEnterPressed}
                          />
                          <button type="submit" className="mx-2 text-success" onClick={this.handleHiddenEdit} ><i className="fas fa-pen" /></button>
                        </form>
                    <div className="todo-icon justify-content-end ">
              <span className="mx-2 text-success">
                <i className="fas fa-pen" ref={this.myEditButton} onClick={this.handleEditTitle}/>
              </span>
                      <span className="mx-2 text-danger">
                <i className="fas fa-trash"/>
              </span>
                    </div>
                  </label>
                </li>
              </div>

            );
          })
            ;
        }}
      </Query>
    );
  }
}

export default TodoItem;
