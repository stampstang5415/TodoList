import React, {Component} from "react";
import TodoItem from "./TodoItem.js";
import {Mutation} from "@apollo/react-components";
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
    query TodoListQuery {
        getTodoList {
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
const REMOVE_TODO = gql`
    mutation EditStatus($id: ID!) {
        removeTodo(id: $id) {
            id
            title
            completed
        }
    }
`;

export class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {new_todo: '', todo_list: []};

    this.handleChange = this.handleChange.bind(this);
    // this.handleEnterPressed = this.handleEnterPressed.bind(this);
  }

  handleChange(event) {
    this.setState({new_todo: event.target.value});
  }

  handleEnterPressed = event => {
    if (event.key === "Enter") {
      console.log("Submit");
      event.currentTarget.value = "";

    }
  }

  componentDidMount() {

  }

  //ส่วน input รับค่า addtodo ส่งไป Mutations
  render() {
    return (
      <div className="card card-body my-3">
        <Mutation
          mutation={ADD_TODO}
          update={(cache, {data: {addTodo}}) => {
            const {getTodoList} = cache.readQuery({query: TODOLIST_QUERY});
            cache.writeQuery({
              query: TODOLIST_QUERY,
              data: {getTodoList: getTodoList.concat([addTodo])},
            });
          }}
        >
          {addTodo => (
            <form
              onSubmit={e => {
                e.preventDefault();
                addTodo({variables: {title: this.state.new_todo}});

              }}
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-primary text-white">
                    <i className="fas fa-book"/>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control inputtext"
                  value={this.state.newtodo}
                  onChange={this.handleChange}
                  onKeyDown={this.handleEnterPressed}

                />

              </div>
            </form>
          )}
        </Mutation>
        {/* เรียกcomponent TodoItem แสดงlistไอเทม */}

        <div>
          <Mutation mutation={REMOVE_TODO} >
            {removeTodo => (
          <Mutation mutation={UPDATE_TITLE} >
            {editTitle => (
          <Mutation mutation={UPDATE_STATUS} children={editStatus => <TodoItem removeTodo={removeTodo} editTitle={editTitle} editStatus={editStatus}/>} />
              )}
            </Mutation>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default TodoInput;
