import { Injectable, inject } from '@angular/core';
import { TodoApi } from "./todo-api";
import { TodoStore } from "./todo-store";
import { Todo } from '../../../shared/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {

  private readonly api = inject(TodoApi);
  private readonly store = inject(TodoStore);

  readonly todos = this.store.todos;
  readonly selectedTodo = this.store.selectedTodo;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly hasTodos = this.store.hasTodos;


  public loadTodos() {
    this.startAction();

    setTimeout(() => {
      this.api.getTodos().subscribe({
        next: (value) => {
          this.store.setTodos(value);
        },
        error: (err) => {
          this.showError(err, 'Failed to load todos');
        },
        complete: () => {
          this.store.setLoading(false);
        }
      });
    }, 777);

  }

  public addTodo(newTodo: Todo) {
    this.startAction();

    this.api.addTodo(newTodo).subscribe({
      next: (value) => {
        this.store.addTodo(value);
      },
      error: (err) => {
        this.showError(err, 'Failed to add todo');
      },
      complete: this.completeAction.bind(this)
    })
  }

  public toggleTodo(todoId: number) {
    this.startAction();

    this.api.toggleTodo(todoId).subscribe({
      next: (value) => {
        this.store.updateTodo(value);
      }, error: (err) => {
        this.showError(err, 'Failed to change status');
      },
      complete: this.completeAction.bind(this)
    })
  }

  public deleteTodo(todoId: number) {
    this.startAction();

    this.api.deleteTodo(todoId).subscribe({
      next: (value) => {
        this.store.removeTodo(value.id!);
      }, error: (err) => {
        this.showError(err, 'Failed to change status');
      },
      complete: this.completeAction.bind(this)
    })
  }

  private startAction() {
    this.store.setLoading(true);
    this.store.setError(null);
  }

  private showError(err: Error, message: string) {
    console.error(err);
    this.store.setError(message);
  }

  private completeAction() {
    this.store.setLoading(false);
  }


}
