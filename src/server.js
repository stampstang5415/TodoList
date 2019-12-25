const cors = require("cors");
const uuidv4 = require("uuid/v4");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
app.use(cors());

const Todo = {
  1: {
    id: "57b6e152-f7e8-4ff7-a872-7ac734d81940",
    title: "Download SQL Server",
    completed: true
  },
  2: {
    id: "b72f1d06-2f4d-40ad-bfcb-7780b178be44",
    title: "Launch the SQL Server Installation Center",
    completed: false
  },
  3: {
    id: "eee5a72e-0627-4340-80f0-f68b652fe1d4",
    title: "Start the Installation Wizard",
    completed: false
  },
  4: {
    id: "808aa9b0-f00c-4130-8c39-3093d38192d0",
    title: "Product Key",
    completed: false
  },
  5: {
    id: "e3bca651-9593-4815-875b-503395f27f42",
    title: "License Terms",
    completed: false
  },
  6: {
    id: "726088ec-98ff-4f01-8569-8979504a9c3d",
    title: "Microsoft Update",
    completed: false
  }
};
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
const resolvers = {
  Query: {
    getTodolist: () => {
      return Object.values(Todo);
    }
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const id = uuidv4();
      const newTodo = {
        id,
        title,
        completed: false
      };
      // console.log(Todo);
      Todo[id] = newTodo;
      // console.log(Todo);
      return Object.values(Todo);
    },
    editTitle: (_, { id, title }) => {
      // const editTodoTitle = {
      //   id,
      //   title
      // };
      // Object.values(Todo).filter(Todo => Todo.id);
      // console.log(Todo);
      // Todo[title.data] = Todo[id] == editTodoTitle.id;
      // Todo[id] = editTodoTitle;
      console.log(Todo);
      return Todo[id];
    },
    removeTodo: (_, { id }) => {
      const { [id]: Todo, ...otherTodo } = Todo;

      if (!Todo) {
        return false;
      }

      Todo = otherTodo;

      return true;
      //   Object.values(Todo).filter(Todo => Todo.id);
      //   // console.log(Todo);
      //   // Todo[title.data] = Todo[id] == editTodoTitle.id;
      //   Todo[id] = editTodoTitle;
      //   console.log(Todo);
      // return [Todo];
      // }
    }
  }
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/playground" });
app.listen({ port: 3012 }, () => {
  console.log("Apollo Server on http://localhost:3012/playground");
});
