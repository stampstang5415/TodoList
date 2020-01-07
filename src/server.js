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
app.listen({ port: 5000 }, () => {
  console.log("Apollo Server on http://localhost:5000/playground");
});
