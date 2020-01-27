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

export class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {new_todo: '', reverseCounter: 0};

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterPressed = this.handleEnterPressed.bind(this);
    this.reverseTodo = this.reverseTodo.bind(this);
  }

  handleChange(event) {
    this.setState({new_todo: event.target.value});
  }

  handleEnterPressed (event) {
    if (event.key === "Enter") {
      console.log("Submit");
      console.log("B",event.currentTarget.value);
      event.currentTarget.value = "";
      // event.preventDefault();
      console.log("A",event.currentTarget.value);
    }
  }
  reverseTodo(){
    if (this.state.reverseCounter === 0) {
      this.setState({reverseCounter: 1});
    }else {
      this.setState({reverseCounter: 0});
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
                if(this.state.new_todo !== ""){
                  addTodo({variables: {title: this.state.new_todo}});
                  e.currentTarget.value = "";
                }
              }}
            >
              <div className="input-group  ">
                <div className="input-group-prepend">
                  <div className="input-group-text m-0 bg-primary text-white">
                    <i className="fas fa-book"/>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control m-0 inputtext"
                  // value={this.state.new_todo}
                  onChange={this.handleChange}
                  onKeyDown={this.handleEnterPressed}

                />
                <div className="input-group-text m-0 bg-primary text-white" onClick={this.reverseTodo} >
                  <i className="fas fa-retweet"  />
                </div>
              </div>
            </form>
          )}
        </Mutation>
        {/* เรียกcomponent TodoItem แสดงlistไอเทม */}

        <div>

          <Mutation mutation={UPDATE_TITLE} >
            {editTitle => (
          <Mutation mutation={UPDATE_STATUS} children={editStatus => <TodoItem reverseCounter={this.state.reverseCounter}  editTitle={editTitle} editStatus={editStatus}/>} />
              )}
            </Mutation>
        </div>
      </div>
    );
  }
}

export default TodoInput;
