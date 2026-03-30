import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../../shared/todo';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { TodoMock } from '../services/todo-mock';

@Component({
  selector: 'app-todo-dashboard',
  imports: [TodoForm, TodoList],
  templateUrl: './todo-dashboard.html',
  styleUrl: './todo-dashboard.css',
  standalone: true,
})
export class TodoDashboard implements OnInit {
  protected todos: Todo[] = [];
  private todoMock: TodoMock = inject(TodoMock);

  ngOnInit(): void {
    this.getTodosFromService();
  }

  private getTodosFromService() {
    this.todoMock.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodoParent($emit: Todo) {
    this.todoMock.addTodo($emit).subscribe((newTodo) => {
      console.log(newTodo);
      this.getTodosFromService();
    });
  }
}
