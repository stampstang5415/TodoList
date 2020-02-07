const cors = require("cors");
const express = require("express");
const schema = require("./schema.js");
const resolvers = require("./resolvers.js");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/playground" });
server.applyMiddleware({ app, path: "/server" });
app.listen({ port: 5000 }, () => {
  console.log("Apollo Server Test API on http://localhost:5000/playground");
  console.log("Apollo Server on http://localhost:5000/server");
});
