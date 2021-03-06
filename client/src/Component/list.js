// import React, { Component } from "react";
// import React from "react";
import React from "react";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";
import deletepic from "./pic/delete.png";
import chevronup from "./pic/chevronup.png";
import chevrondown from "./pic/chevrondown.png";
import tick from "./pic/tick.png";
import dot from "./pic/dot.png";
import paper from "./pic/paper.png";
import "./list.css";

// import Todostate from "./Todostate.js";

const TODOLIST_QUERY = gql`
  query TodoListQuery {
    getTodoList {
      id
      title
      completed
    }
  }
`;
export class list extends React.Component {
  componentDidMount(completed) {
    if (completed === true) {
      return (
        <button type="button" class="btn btn-success">
          Success
        </button>
      );
    } else {
      return (
        <button type="button" class="btn btn-danger">
          Danger
        </button>
      );
    }
  }
  render() {
    return (
      <div>
        <Query query={TODOLIST_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            // console.log(data);
            // return <h1>test</h1>;
            return data.getTodoList.map(({ id, title, completed }) => (
              <div key={id}>
                <div className="card card-body my-3">
                  <form>
                    <h2>Title: {title}</h2>
                    <br></br>
                    <div class="row">
                      <div class="col">
                        <h5>completed :</h5>
                        <img
                          type="button"
                          src={dot}
                          alt="todolist"
                          className="buttondelete"
                        />
                      </div>
                      <div class="col">
                        <img
                          type="button"
                          src={paper}
                          alt="todolist"
                          className="buttondelete"
                        />
                      </div>
                      <div class="col">
                        <img
                          type="button"
                          src={deletepic}
                          alt="todolist"
                          className="buttondelete"
                        />
                      </div>
                      <div class="col">
                        <img
                          type="button"
                          src={chevronup}
                          alt="todolist"
                          className="buttondelete"
                        />
                        <br />
                        <img
                          type="button"
                          src={chevrondown}
                          alt="todolist"
                          className="buttondelete"
                        />{" "}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}
export default list;
