// import React, { Component } from "react";
import React from "react";
import logo from "./To-Do-List-Excel.png";
import plus from "./plus.png";
import Addtodo from "./addtodo.js";
import "./main.css";

export class main extends React.Component {
  render() {
    return (
      <div>
        <img src={logo} alt="todolist" className="todopic" />
        <h1 className="todotitle">ToDoList</h1>
        {/* <img type="button" src={plus} alt="todolist" className="buttonaddnew" /> */}
        <br />
        {/* <input className="inputtext" /> */}
        <Addtodo />
      </div>
    );
  }
}
export default main;
