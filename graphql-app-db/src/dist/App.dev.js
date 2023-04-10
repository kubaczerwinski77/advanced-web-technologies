"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _graphqlYoga = require("graphql-yoga");

var _nodeHttp = require("node:http");

var _nodeFs = require("node:fs");

var _nodePath = require("node:path");

var _axios = _interopRequireDefault(require("axios"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var uri = "mongodb+srv://karo:Piosenka_6@graphql.ngknp7d.mongodb.net/?retryWrites=true&w=majority";

_mongoose["default"].connect(uri).then(function () {
  return console.log("DB connected!");
})["catch"](function (err) {
  return console.log(err);
});

var User = _mongoose["default"].model("User", {
  name: String,
  email: String,
  login: String
});

var ToDoItem = _mongoose["default"].model("ToDoItem", {
  title: String,
  completed: Boolean,
  user_id: String
});

var schema = (0, _graphqlYoga.createSchema)({
  typeDefs: (0, _nodeFs.readFileSync)((0, _nodePath.join)("./src/schema.graphql"), "utf8"),
  resolvers: {
    Query: {
      users: function users() {
        return User.find();
      },
      user: function user(_, _ref) {
        var id, result;
        return regeneratorRuntime.async(function user$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                _context.next = 3;
                return regeneratorRuntime.awrap(User.findById(id));

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      todos: function todos() {
        return ToDoItem.find();
      },
      todo: function todo(_, _ref2) {
        var id, result;
        return regeneratorRuntime.async(function todo$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref2.id;
                _context2.next = 3;
                return regeneratorRuntime.awrap(ToDoItem.findById(id));

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        });
      }
    },
    User: {
      todos: function todos(parent, args, context, info) {
        return ToDoItem.find({
          user_id: parent.id
        });
      }
    },
    ToDoItem: {
      user: function user(parent, args, context, info) {
        return User.findById(parent.user_id);
      }
    },
    Mutation: {
      addUser: function addUser(_, _ref3) {
        var name, email, login, user;
        return regeneratorRuntime.async(function addUser$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                name = _ref3.name, email = _ref3.email, login = _ref3.login;
                user = new User({
                  name: name,
                  email: email,
                  login: login
                });
                _context3.next = 4;
                return regeneratorRuntime.awrap(user.save());

              case 4:
                return _context3.abrupt("return", user);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        });
      },
      deleteUser: function deleteUser(_, _ref4) {
        var id;
        return regeneratorRuntime.async(function deleteUser$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref4.id;
                _context4.prev = 1;
                _context4.next = 4;
                return regeneratorRuntime.awrap(User.findById(id));

              case 4:
                if (!_context4.sent) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 7;
                return regeneratorRuntime.awrap(User.findByIdAndRemove(id));

              case 7:
                return _context4.abrupt("return", "User deleted");

              case 8:
                return _context4.abrupt("return", "Not user found");

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);
                throw new Error(_context4.t0);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, null, null, [[1, 11]]);
      },
      updateUser: function updateUser(_, _ref5) {
        var id, name, email, login;
        return regeneratorRuntime.async(function updateUser$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref5.id, name = _ref5.name, email = _ref5.email, login = _ref5.login;
                _context5.prev = 1;
                _context5.next = 4;
                return regeneratorRuntime.awrap(User.findById(id));

              case 4:
                if (!_context5.sent) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 7;
                return regeneratorRuntime.awrap(User.findByIdAndUpdate(id, {
                  name: name,
                  email: email,
                  login: login
                }, {
                  "new": true
                }));

              case 7:
                return _context5.abrupt("return", _context5.sent);

              case 8:
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](1);
                throw new Error(_context5.t0);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, null, null, [[1, 10]]);
      },
      addToDoItem: function addToDoItem(_, _ref6) {
        var title, completed, user_id, todoitem;
        return regeneratorRuntime.async(function addToDoItem$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                title = _ref6.title, completed = _ref6.completed, user_id = _ref6.user_id;
                _context6.prev = 1;
                _context6.next = 4;
                return regeneratorRuntime.awrap(User.findById(user_id));

              case 4:
                if (!_context6.sent) {
                  _context6.next = 9;
                  break;
                }

                todoitem = new ToDoItem({
                  title: title,
                  completed: completed,
                  user_id: user_id
                });
                _context6.next = 8;
                return regeneratorRuntime.awrap(todoitem.save());

              case 8:
                return _context6.abrupt("return", todoitem);

              case 9:
                _context6.next = 14;
                break;

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](1);
                throw new Error(_context6.t0);

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, null, null, [[1, 11]]);
      },
      updateToDoItem: function updateToDoItem(_, _ref7) {
        var id, title, completed, user_id;
        return regeneratorRuntime.async(function updateToDoItem$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = _ref7.id, title = _ref7.title, completed = _ref7.completed, user_id = _ref7.user_id;
                _context7.prev = 1;
                _context7.next = 4;
                return regeneratorRuntime.awrap(User.findById(user_id));

              case 4:
                _context7.t0 = _context7.sent;

                if (!_context7.t0) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 8;
                return regeneratorRuntime.awrap(ToDoItem.findById(id));

              case 8:
                _context7.t0 = _context7.sent;

              case 9:
                if (!_context7.t0) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 12;
                return regeneratorRuntime.awrap(ToDoItem.findByIdAndUpdate(id, {
                  title: title,
                  completed: completed,
                  user_id: user_id
                }, {
                  "new": true
                }));

              case 12:
                return _context7.abrupt("return", _context7.sent);

              case 13:
                _context7.next = 18;
                break;

              case 15:
                _context7.prev = 15;
                _context7.t1 = _context7["catch"](1);
                throw new Error(_context7.t1);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, null, null, [[1, 15]]);
      },
      deleteToDoItem: function deleteToDoItem(_, _ref8) {
        var id;
        return regeneratorRuntime.async(function deleteToDoItem$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                id = _ref8.id;
                _context8.prev = 1;
                _context8.next = 4;
                return regeneratorRuntime.awrap(ToDoItem.findById(id));

              case 4:
                if (!_context8.sent) {
                  _context8.next = 8;
                  break;
                }

                _context8.next = 7;
                return regeneratorRuntime.awrap(ToDoItem.findByIdAndRemove(id));

              case 7:
                return _context8.abrupt("return", "ToDoItem deleted");

              case 8:
                return _context8.abrupt("return", "Not toDoItem found");

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](1);
                throw new Error(_context8.t0);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, null, null, [[1, 11]]);
      }
    }
  }
}); // Create a Yoga instance with a GraphQL schema.

exports.schema = schema;
var yoga = (0, _graphqlYoga.createYoga)({
  schema: schema
}); // Pass it into a server to hook into request handlers.

var server = (0, _nodeHttp.createServer)(yoga); // Start the server and you're done!

_mongoose["default"].connection.once("open", function () {
  server.listen(4000, function () {
    console.info("Server is running on http://localhost:4000/graphql");
  });
});