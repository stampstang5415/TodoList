const cors = require("cors");
const uuidv4 = require("uuid/v4");
const express = require("express");
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
      const file = fs.readFileSync("src/data.json", "utf8");
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
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      console.log(objIndex);
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/data.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo[objIndex];
    },
    editTitle: (_, { id, title }) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      jsonObj.Todo[objIndex].title = title;
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/data.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo[objIndex];
    },
    editStatus: (_, { id, completed }) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      jsonObj.Todo[objIndex].completed = completed;
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/data.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo[objIndex];
    },
    removeTodo: (_, { id }) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      // jsonObj.Todo[objIndex].completed = completed;
      // delete jsonObj.Todo[objIndex];
      jsonObj.Todo.splice(objIndex, 1);
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/data.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo;
    },
    changePosition: (_, { id, position }) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      // delete jsonObj.Todo[objIndex];
      let jsonchange = jsonObj.Todo[objIndex];
      jsonObj.Todo.splice(objIndex, 1);
      jsonObj.Todo.splice(position, 0, jsonchange);
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/data.json", jsonContent);
      console.log("JSON file has been saved.");
      let viewremove = jsonObj;
      return viewremove.Todo[position];
    }
  }
};
module.exports = resolvers;
