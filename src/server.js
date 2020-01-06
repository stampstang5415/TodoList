const cors = require("cors");
const uuidv4 = require("uuid/v4");
const express = require("express");
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
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      jsonObj.Todo[objIndex].title = title;
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/testdata.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo[objIndex];
    },
    editStatus: (_, { id, completed }) => {
      const file = fs.readFileSync("src/testdata.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      jsonObj.Todo[objIndex].completed = completed;
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/testdata.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo[objIndex];
    },
    removeTodo: (_, { id }) => {
      const file = fs.readFileSync("src/testdata.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      // jsonObj.Todo[objIndex].completed = completed;
      delete jsonObj.Todo[objIndex];
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/testdata.json", jsonContent);
      console.log("JSON file has been saved.");

      return jsonObj.Todo;
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
