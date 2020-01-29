const { gql } = require("apollo-server");

const schema = gql`
scalar Date
  type Todo {
    id: ID!
    title: String
    completed: Boolean
    addtime: Date
    # priority: Int!
  }
  type Mutation {
    addTodo(title: String!): Todo
    editTitle(id: ID!, title: String!): Todo
    editStatus(id: ID!, completed: Boolean!): Todo
    removeTodo(id: ID!): [Todo]
    changePosition(id: ID!, position: Int!): Todo
  }
  type Query {
    getTodoList(sort: String): [Todo]
  }
`;

module.exports = schema;
