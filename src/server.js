const cors = require("cors");
const uuidv4 = require("uuid/v4");
const express = require("express");
const graphql = require("graphql");
const schema = require("./schema.js");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const app = express();
app.use(cors());
const resolvers = {
  Query: {
    getTodoList: () => {
      const file = fs.readFileSync("src/data.json", "utf8");
      console.log(file);
      return JSON.parse(file).Todo;
    }
  },

  Mutation: {
    addTodo: (_, { title }) => {
      const file = fs.readFileSync("src/testdata.json", "utf8");
      const id = uuidv4();
      const newTodo = {
        id,
        title,
        completed: false
      };
      // console.log(Todo);
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      jsonObj.Todo.push(newTodo);
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/testdata.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo;
    },
    editTitle: (_, { id, title }) => {
      const file = fs.readFileSync("src/testdata.json", "utf8");
      // const editTodoTitle = {
      //   id,
      //   title
      // };
      // Object.values(Todo).filter(Todo => Todo.id);
      // console.log(Todo);
      // Todo[title.data] = Todo[id] == editTodoTitle.id;
      // Todo[id] = editTodoTitle;
      objIndex = myArray.findIndex(obj => obj.id == 1);
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      jsonObj.Todo.push(newTodo);
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/testdata.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo;
    }
    //   removeTodo: (_, { id }) => {
    //     const { [id]: Todo, ...otherTodo } = Todo;

    //     if (!Todo) {
    //       return false;
    //     }

    //     Todo = otherTodo;

    //     return true;
    //     //   Object.values(Todo).filter(Todo => Todo.id);
    //     //   // console.log(Todo);
    //     //   // Todo[title.data] = Todo[id] == editTodoTitle.id;
    //     //   Todo[id] = editTodoTitle;
    //     //   console.log(Todo);
    //     // return [Todo];
    //     // }
    //   }
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
