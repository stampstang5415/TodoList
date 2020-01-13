import React from "react";
import "./App.css";
import logo from "./To-Do-List-Excel.png";
import List from "./Component/list.js";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: "http://localhost:5000/playground"
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <img src={logo} alt="todolist" id="logom" />
          <h1>ToDoList</h1>
          <List />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
