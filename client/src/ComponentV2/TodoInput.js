import React, { Component } from "react";
import TodoItem from "./TodoItem.js";
import { Query } from "@apollo/react-components";
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
export class TodoInput extends Component {
  //ส่วน input รับค่า addtodo ส่งไป Mutations
  render() {
    // const {
    //   item,
    //   items,
    //   handleChange,
    //   handleSubmit,
    //   handleDelete
    // } = this.props;
    return (
      <div className="card card-body my-3">
        <form onSubmit={handleSubmit}>
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
              value={item}
              onChange={handleChange}
            />
          </div>
          {/* <button type="submit" className="btn btn-block btn-primary mt-3">
            add item
          </button> */}
          {/* เรียกcomponent TodoItem แสดงlistไอเทม */}
          <Query query={TODOLIST_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              // console.log(data);
              // return <h1>test</h1>;
              return data.getTodoList.map(({ id, title, completed }) => (
                <div>
                  <TodoItem key={id} title={title} completed={completed} />
                </div>
              ));
            }}
          </Query>
        </form>
      </div>
    );
  }
}

export default TodoInput;
