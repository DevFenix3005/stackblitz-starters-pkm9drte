import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { Todo } from '../../../shared/models/todo';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { TodoFacade } from '../services/todo-facade';

@Component({
  selector: 'app-todo-dashboard',
  imports: [TodoForm, TodoList],
  templateUrl: './todo-dashboard.html',
  styleUrl: './todo-dashboard.scss'
})
export class TodoDashboard implements OnInit {

  private todoFacade: TodoFacade = inject(TodoFacade);
  protected todos: Signal<Todo[]> = this.todoFacade.todos;
  protected loadingTodos: Signal<boolean> = this.todoFacade.loading;

  ngOnInit(): void {
    this.getTodosFromMock();
  }

  private getTodosFromMock() {
    this.todoFacade.loadTodos();
  }

  addTodoParent($emit: Todo) {
    this.todoFacade.addTodo($emit);
  }

  toggleTodoParent($event: number) {
    this.todoFacade.toggleTodo($event);
  }

  deleteTodoParent($event: number) {
    this.todoFacade.deleteTodo($event);
  }
}
