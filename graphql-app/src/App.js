import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import axios from "axios";

async function getRestUsersList() {
  try {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(users);
    return users.data.map(({ id, name, email, username }) => ({
      id: id,
      name: name,
      email: email,
      login: username,
    }));
  } catch (error) {
    throw error;
  }
}

async function getRestTodosList() {
  try {
    const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(todos);
    return todos.data.map(({ id, title, completed, userId }) => ({
      id: id,
      title: title,
      completed: completed,
      user_id: userId,
    }));
  } catch (error) {
    throw error;
  }
}

var usersList = await getRestUsersList();
var todosList = await getRestTodosList();

function todoById(parent, args, context, info) {
  return todosList.find((todo) => todo.id == args.id);
}
function userById(parent, args, context, info) {
  return usersList.find((user) => user.id == args.id);
}

export const schema = createSchema({
  typeDefs: readFileSync(join("./src/schema.graphql"), "utf8"),
  resolvers: {
    Query: {
      users: async () => usersList,
      todos: async () => todosList,
      todo: (parent, args, context, info) => todoById(parent, args, context, info),
      user: (parent, args, context, info) => userById(parent, args, context, info),
    },
    User: {
      todos: (parent, args, context, info) => {
        return todosList.filter((todo) => todo.user_id == parent.id);
      },
    },
    ToDoItem: {
      user: (parent, args, context, info) => {
        return usersList.find((user_inner) => user_inner.id == parent.user_id);
      },
    },
  },
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema });

// Pass it into a server to hook into request handlers.
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
