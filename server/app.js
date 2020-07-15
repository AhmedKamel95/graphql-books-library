const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// Connection to MongoDB
mongoose.connect(
  "mongodb+srv://ahmed:test1234@cluster0.7pbtq.mongodb.net/testdb?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now Listening for requests on port 4000");
});
