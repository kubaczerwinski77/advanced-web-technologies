import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { devNull } from "node:os";
dotenv.config();

const uri =
  "mongodb+srv://karo:Piosenka_6@graphql.ngknp7d.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

const User = mongoose.model("User", {
  name: String,
  email: String,
  login: String,
});

const ToDoItem = mongoose.model("ToDoItem", {
  title: String,
  completed: Boolean,
  user_id: String,
});

export const schema = createSchema({
  typeDefs: readFileSync(join("./src/schema.graphql"), "utf8"),
  resolvers: {
    Query: {
      users: () => User.find(),
      user: async (_, { id }) => {
        var result = await User.findById(id);
        return result;
      },
      todos: () => ToDoItem.find(),
      todo: async (_, { id }) => {
        var result = await ToDoItem.findById(id);
        return result;
      },
    },
    User: {
      todos: (parent, args, context, info) => {
        return ToDoItem.find({ user_id: parent.id });
      },
    },
    ToDoItem: {
      user: (parent, args, context, info) => {
        return User.findById(parent.user_id);
      },
    },
    Mutation: {
      addUser: async (_, { name, email, login }) => {
        const user = new User({ name, email, login });
        await user.save();
        return user;
      },
      deleteUser: async (_, { id }) => {
        try {
          if (await User.findById(id)) {
            if ((await ToDoItem.find({ user_id: id })).length== 0) {
              await User.findByIdAndRemove(id);
              return "User deleted";
            } else {
              return "User has ToDoItems";
            }
          }
          return "Not user found";
        } catch (err) {
          throw new Error(err);
        }
      },
      updateUser: async (parent, { id, name, email, login }) => {
        try {
          if (await User.findById(id)) {
            return await User.findByIdAndUpdate(
              id,
              { name, email, login },
              { new: true }
            );
          }
        } catch (err) {
          throw new Error(err);
        }
      },
      addToDoItem: async (_, { title, completed, user_id }) => {
        try {
          if (await User.findById(user_id)) {
            const todoitem = new ToDoItem({ title, completed, user_id });
            await todoitem.save();
            return todoitem;
          }
        } catch (err) {
          throw new Error(err);
        }
      },
      updateToDoItem: async (_, { id, title, completed, user_id }) => {
        try {
          if ((await User.findById(user_id)) && (await ToDoItem.findById(id))) {
            return await ToDoItem.findByIdAndUpdate(
              id,
              { title, completed, user_id },
              { new: true }
            );
          }
        } catch (err) {
          throw new Error(err);
        }
      },
      deleteToDoItem: async (_, { id }) => {
        try {
          if (await ToDoItem.findById(id)) {
            await ToDoItem.findByIdAndRemove(id);
            return "ToDoItem deleted";
          }
          return "Not toDoItem found";
        } catch (err) {
          throw new Error(err);
        }
      },
    },
  },
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema });

// Pass it into a server to hook into request handlers.

const server = createServer(yoga);

// Start the server and you're done!
mongoose.connection.once("open", function () {
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
});
