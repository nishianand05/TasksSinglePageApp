var db = require("../models")


// Get all todos
exports.getTodos = function(req, res){
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	})
}

// Create new todo
exports.createTodo = function(req, res){
	db.Todo.create(req.body)
	.then(function(newTodo){
		res.status(201).json(newTodo);
	})
	.catch(function(err){
		res.send(err)
	})
}

// Get particular todo using ID
exports.getTodo = function(req, res){
	db.Todo.findById(req.params.todoId)
	.then(function(foundTodo){
		res.json(foundTodo);
	})
	.catch(function(err){
		res.end(err);
	})
}

// Update todo based on ID
exports.updateTodo = function(req, res){
	db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
	.then(function(updatedTodo){
		res.json(updatedTodo)
	})
	.catch(function(err){
		res.send(err)
	})
}

// Delete a todo
exports.deleteTodo = function(req, res){
	db.Todo.deleteOne({_id: req.params.todoId})
	.then(function(deletedTodo){
		res.json({message: "To do deleted!"})
	})
	.catch(function(err){
		res.send(err);
	})
}