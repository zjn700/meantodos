import { Component, OnInit } from '@angular/core';
import { TodoService } from "../services/todo.service";
import { Todo } from "../Todo";

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit { 
    todos: Todo[];
    
    constructor(private _todoService:TodoService){
        
    }
    
    ngOnInit(){
        this.todos = [];
        this._todoService.getTodos()
            .subscribe(todos => {
                console.log(todos);
                this.todos = todos;
            })
    }
    
    
    addTodo(event, todoText){
        console.log(todoText.value);
        var result;
        var newTodo = {
            text: todoText.value,
            isCompleted: false
        }
        
        this._todoService.saveTodo(newTodo)
            .subscribe(data => {
                this.todos.push(newTodo);
                todoText.value = "";
                this._todoService.getTodos()  // update list
                    .subscribe(todos => {
                    this.todos = todos;
                })
        })
    }
    
    setEditState(todo, state){
        if (state){
            todo.isEditMode = state;
        } else {
            delete todo.isEditMode;
        }
    }
    
    updateStatus(todo){
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        
        this._todoService.updateTodo(_todo)
            .subscribe(data => {
                todo.isCompleted = !todo.isCompleted;
            });
    }
    
    updateTodoText(event, todo){
        console.log('here in upddateT0doText')
        if (event.which === 13) {
            console.log("yep")
            todo.text = event.target.value;
            var _todo {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
                .subscribe(data => {
                    this.setEditState(todo, false)
                })
        }
    }
    
    deleteTodo(todo){
        console.log("here in deleteTodo");
        var todos = this.todos;
        console.log("todo._id " + todo._id)
        this._todoService.deleteTodo(todo._id)
            .subscribe(data => {
                if (data.n == 1) {
                    for (var i=0; i < todos.length; i++) {
                        if (todos[i]._id == todo._id) {
                            todos.splice(i, 1);
                            
                        }
                    }
                }
            })
    }
    
}
            //.map(res => res.json)
