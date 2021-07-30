$(document).ready(function(){
	
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch(function(err){
		alert(err);
	})
	
	// Create todo
	
	$('#todoInput').keypress(function(event){
		if(event.which === 13 && $("#todoInput").val()!==''){
			createTodo();
		}
	})
	
	// Update todo
	$('.list').on('click', 'li', function(){
		updateTodo($(this))
	})
	
	// Delete todo
	$('.list').on('click', '.deleteTodo', function(e){
		e.stopPropagation();
		removeTodo($(this).parent());
	})
	
});

function addTodos(todos){
	
	// For each todos, add todo to DOM
	todos.forEach(function(todo){
		addTodo(todo);
	})
}

function addTodo(todo){
	
	var createdDate = '<span class="todoDate">Created on ' + todo.created_date.slice(0,10) + '</span>';
	var bin = '<span class="deleteTodo"><i class="far fa-trash-alt"></i></span>'
	var newTodo = $('<li class="task">' + todo.name +  createdDate + bin + '</li>')
	
	newTodo.data('id', todo._id)
	newTodo.data('completed', todo.completed)
	
	if(todo.completed){
		newTodo.addClass("done");
	}
	
	$(".list").append(newTodo);
}

// Creating new todo
function createTodo(){
	
	var userInput = $('#todoInput').val();
	$.post('/api/todos', {
		name: userInput
	})
	.then(function(newTodo){
		$('#todoInput').val('');
		addTodo(newTodo);
	})
	.catch(function(err){
		alert("Cannot add new todo");
	})
}

// Updating existing todo

function updateTodo(todo){
	
	var clickedId = todo.data('id'); 
	var updateURL = '/api/todos/' + clickedId;
	var isDone = !todo.data('completed'); 
	var updateData = {completed: isDone}
	
	$.ajax({
		method: 'PUT',
		url: updateURL,
		data: updateData
	})
	.then(function(updatedData){
		todo.toggleClass("done");
		todo.data('completed', isDone);
	})
	.catch(function(err){
		alert("Error!");
	})
	
}

// Delete existing todo
function removeTodo(todo){
	var clickedId = todo.data('id'); 
	var deleteURL = '/api/todos/' + clickedId;
		$.ajax({
			method: 'DELETE',
			url: deleteURL
		})
		.then(function(deletedTodo){
			todo.remove()
		    // alert("Deleted todo!");
		})
		.catch(function(err){
			alert("Cannot delete todo!");
		})
}