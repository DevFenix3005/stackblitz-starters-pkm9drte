import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TodoFilterPipe } from '../../../core/pipes/todo-filter-pipe';
import { Todo } from '../../../shared/models/todo';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { TodoMock } from '../services/todo-mock';

@Component({
  selector: 'app-todo-dashboard',
  imports: [TodoForm, TodoList, TodoFilterPipe],
  templateUrl: './todo-dashboard.html',
  styleUrl: './todo-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDashboard implements OnInit {

  protected todos: Todo[] = [];
  private todoMock: TodoMock = inject(TodoMock);
  protected filter: string = "all";

  ngOnInit(): void {
    this.getTodosFromMock();
  }

  private getTodosFromMock() {
    this.todoMock.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  filterTodoParent($event: string) {
    this.filter = $event;
  }

  addTodoParent($emit: Todo) {
    this.todoMock.addTodo($emit).subscribe((_) => {
      this.getTodosFromMock();
    });
  }

  toggleTodoParent($event: number) {
    this.todoMock.toggleTodo($event);
    this.getTodosFromMock();
  }


  deleteTodoParent($event: number) {
    this.todoMock.deleteTodo($event);
    this.getTodosFromMock();
  }
}
