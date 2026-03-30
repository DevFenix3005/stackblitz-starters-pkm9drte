import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/todo';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  @Input()
  todos!: Todo[];
}
