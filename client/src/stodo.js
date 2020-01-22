import React from "react";
// import "./App.css";
import TodoInput from "./ComponentV2/TodoInput.js";
import "bootstrap/dist/css/bootstrap.min.css";

import uuid from "uuid";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
// import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:5000/playground"
});

class stodo extends React.Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };
    console.log(newItem);
    const updateItem = [...this.state.items, newItem];

    this.setState({
      items: updateItem,
      item: "",
      id: uuid(),
      editItem: false
    });
  };
  // handleDelete = id => {
  //   const filteredItems = this.state.items.filter(item => item.id != id);
  //   this.setState({
  //     items: filteredItems
  //   });
  // };
  render() {
    // หน้าหลักส่งไป render
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <div className="row ">
            <div className="col-10 mx-auto col-md-8 mt4">
              <h3 className="text-capitalize text-center">Stodo</h3>
              <TodoInput
                item={this.state.item}
                items={this.state.items}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}
              />
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default stodo;
