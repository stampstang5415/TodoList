import React from "react";
// import "./App.css";
import TodoInput from "./ComponentV2/TodoInput.js";
import "bootstrap/dist/css/bootstrap.min.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
// import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:5000/playground"
});

class stodo extends React.Component {
  // componentWillUnmount() {
  //   client.resetStore()
  // }
  render() {
    // หน้าหลักส่งไป render
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <div className="row ">
            <div className="col-10 mx-auto col-md-8 mt4">
              <h3 className="text-capitalize text-center">Stodo</h3>
              <TodoInput/>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default stodo;
