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
            addtime
        }
    }
`;

const TODOLIST_QUERY = gql`
    query TodoListQuery($sort: String) {
        getTodoList(sort: $sort) {
            id
            title
            completed
            addtime
        }
    }
`;
const UPDATE_TITLE = gql`
    mutation EditTitle($id: ID!, $title: String!) {
        editTitle(id: $id, title: $title) {
            id
            title
            completed
            addtime
        }
    }
`;
const UPDATE_STATUS = gql`
    mutation EditStatus($id: ID!, $completed: Boolean!) {
        editStatus(id: $id, completed: $completed) {
            id
            title
            completed
            addtime
        }
    }
`;

export class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {new_todo: '', reverseCounter: "Newest" };

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
    if (this.state.reverseCounter === "Newest") {
      this.setState({reverseCounter: "Oldest"});
    }else {
      this.setState({reverseCounter: "Newest"});
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
          refetchQueries={() => [{ query: TODOLIST_QUERY, variables: { sort: "Newest" } },{ query: TODOLIST_QUERY, variables: { sort: "Oldest" } }]}
          // update={(cache, {data: {addTodo}}) => {
          //   let reverseTodo;
          //   const {getTodoList} = cache.readQuery({query: TODOLIST_QUERY,variables:{  sort: this.state.reverseCounter } });
          //   if (this.state.reverseCounter !== "Oldest" ){
          //     reverseTodo = [addTodo].concat(getTodoList);
          //   }else {
          //     reverseTodo = getTodoList.concat([addTodo]);
          //   }
          //   cache.writeQuery({
          //     query: TODOLIST_QUERY,
          //     variables:{  sort: this.state.reverseCounter },
          //     data: {getTodoList: reverseTodo},
          //   });
          // }}
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
                <div className="input-group-text m-0 bg-primary text-white" onClick={this.reverseTodo } >
                  <i className="fas fa-retweet"  />
                </div>
              </div>
            </form>
          )}
        </Mutation>
        {/* เรียกcomponent TodoItem แสดงlistไอเทม */}

        <div>
          <h2>{this.state.reverseCounter}</h2>
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
