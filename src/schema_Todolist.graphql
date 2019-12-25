const { gql } = require("apollo-server");

const schema = gql`
  type Todo {
    id: ID!
    title: String
    completed: Boolean
    # priority: Int!
  }
  type Mutation {
    addTodo(title: String!): [Todo]
    editTitle(id: ID!, title: String!): [Todo]
    # editStatus(id: ID!, completed: Boolean!): Todo!
    removeTodo(id: ID!): Boolean!
  }
  type Query {
    getTodolist: [Todo!]!
  }
`;

module.exports = schema;
