import React from "react";
import "./App.css";
import List from "./Component/list.js";
import Todobar from "./Component/todobar.js";
import Main from "./Component/main.js";
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
          <Todobar />
          <div class="row">
            <div class="col">
              <Main />
            </div>
            <div class="col">
              <List />
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
