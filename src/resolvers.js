const { gql } = require("apollo-server");

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

module.exports = resolvers;
