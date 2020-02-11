import React from "react";
import TodoInput from "./ComponentV2/TodoInput.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import styled from "styled-components";

// uri ของ server
const client = new ApolloClient({
  uri: "http://localhost:5000/server"
});

const Page = styled.div`
  padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
   max-width: 500px;
    
`;
const Title = styled.h1`
  text-align: center!important;
  margin-top: 10px;
`;

function stodo() {
  return (
    <ApolloProvider client={client}>
      <Page>
        <Title>Stodo</Title>
        <TodoInput/>
      </Page>
    </ApolloProvider>
  );
}


export default stodo;
