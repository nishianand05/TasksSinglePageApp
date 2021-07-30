var mongoose = require("mongoose");

mongoose.set('debug', true);
mongoose.connect("mongodb://localhost/todo-api",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//For promises
mongoose.Promise = 	Promise;

module.exports.Todo = require("./todo");