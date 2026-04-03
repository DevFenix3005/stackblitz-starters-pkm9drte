import { Injectable, signal, computed } from '@angular/core';

import { Todo } from '../../../shared/models/todo';

export interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | null;
  loading: boolean;
  error: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class TodoStore {

  private readonly state = signal<TodoState>({
    todos: [],
    selectedTodo: null,
    loading: false,
    error: null
  })

  readonly todos = computed(() => this.state().todos);
  readonly selectedTodo = computed(() => this.state().selectedTodo);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly hasTodos = computed(() => this.state().todos.length > 0);

  setTodos(todos: Todo[]): void {
    this.state.update(state => ({
      ...state,
      todos
    }));
  }

  setSelectedTodo(selectedTodo: Todo | null): void {
    this.state.update(state => ({
      ...state,
      selectedTodo
    }));
  }

  setLoading(loading: boolean): void {
    this.state.update(state => ({
      ...state,
      loading
    }));
  }

  setError(error: string | null): void {
    this.state.update(state => ({
      ...state,
      error
    }));
  }

  addTodo(todo: Todo): void {
    this.state.update(state => ({
      ...state,
      todos: [...state.todos, todo]
    }));
  }

  updateTodo(updatedTodo: Todo): void {
    this.state.update(state => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
      selectedUser:
        state.selectedTodo?.id === updatedTodo.id
          ? updatedTodo
          : state.selectedTodo
    }));
  }

  removeTodo(todoId: number): void {
    this.state.update(state => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== todoId),
      selectedTodo:
        state.selectedTodo?.id === todoId ? null : state.selectedTodo
    }));
  }

  reset(): void {
    this.state.set({
      todos: [],
      selectedTodo: null,
      loading: false,
      error: null
    });
  }


}
