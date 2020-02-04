import React from "react";
// import "./App.css";
import TodoInput from "./ComponentV2/TodoInput.js";
import "bootstrap/dist/css/bootstrap.min.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:5000/playground"
});

function stodo() {
    return (
      <ApolloProvider client={client}>
        <div className="container" style={ {width: '800px'}} >
          <div className="row ">
            <div className="col-10 mx-auto col-md-8 mt4">
              <h1 className="text-capitalize text-center">Stodo</h1>
              <TodoInput/>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
}

export default stodo;
