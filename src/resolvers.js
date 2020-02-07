const cors = require("cors");
const uuidv4 = require("uuid/v4");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(cors());

const resolvers = {
  Query: {
    getTodoList: (parent, {sort}) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      if (sort === "Oldest") {
        // console.log(file);
        let jsonObj = JSON.parse(file);
        console.log(jsonObj);
        jsonObj.Todo.sort(function (a, b) {
          return new Date(a.addtime) - new Date(b.addtime);
        });
        return jsonObj.Todo;

      }
      if (sort === "Newest") {
        console.log(file);
        let jsonObj = JSON.parse(file);
        console.log(jsonObj);
        jsonObj.Todo.sort(function (a, b) {
          return new Date(b.addtime) - new Date(a.addtime);
        });
        return jsonObj.Todo;
      } else {
        console.log(file);
        return JSON.parse(file).Todo;
      }
    }
  },

  Mutation: {
    addTodo: (parent, {title}) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      const id = uuidv4();
      const date = new Date();
      const newTodo = {
        id,
        title,
        completed: false,
        addtime: date
      };
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
    editTitle: (parent, {id, title}) => {
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
    editStatus: (parent, {id, completed}) => {
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
    // checkAllStatus: (parent, { completed }) => {
    //   const file = fs.readFileSync("src/data.json", "utf8");
    //   let getFullName(item) {
    //     let fullname = [item.id,item.title,item.completed = completed,item.addtime]
    //     return fullname;
    //   }
    //   // const checkAl = completed
    //   let jsonObj = JSON.parse(file);
    //   console.log(jsonObj);
    //   // jsonObj.Todo.completed = completed;
    //   let checkAl =  jsonObj.Todo.map(getFullName);
    //   let jsonContent = JSON.stringify(checkAl);
    //   console.log(jsonContent);
    //   fs.writeFileSync("src/data.json", jsonContent);
    //   console.log("JSON file has been saved.");
    //   return checkAl.Todo;
    // },
    removeTodo: (parent, {id}) => {
      const file = fs.readFileSync("src/data.json", "utf8");
      let jsonObj = JSON.parse(file);
      console.log(jsonObj);
      objIndex = jsonObj.Todo.findIndex(obj => obj.id == id);
      jsonObj.Todo.splice(objIndex, 1);
      let jsonContent = JSON.stringify(jsonObj);
      console.log(jsonContent);
      fs.writeFileSync("src/data.json", jsonContent);
      console.log("JSON file has been saved.");
      return jsonObj.Todo;
    },
    changePosition: (parent, {id, position}) => {
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
