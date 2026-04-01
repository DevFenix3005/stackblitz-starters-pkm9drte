import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Todo } from '../../../shared/models/todo';


@Injectable({
  providedIn: 'root',
})
export class TodoMock {
  private inMemoryData: Todo[] = [];

  public getTodos(): Observable<Todo[]> {
    return of(this.inMemoryData);
  }

  public addTodo(newTodo: Todo): Observable<Todo> {
    const nextId = this.inMemoryData.length + 1;
    newTodo.id = nextId;
    this.inMemoryData = [...this.inMemoryData, newTodo];
    return of(newTodo);
  }

  public toggleTodo(todo: Todo): void;
  public toggleTodo(todo: number): void;
  public toggleTodo(todo: unknown): void {
    console.log(todo);
    let todoId = this.getTodoId(todo);
    this.inMemoryData = this.inMemoryData.map(todoItem => {
      if (todoItem.id === todoId) {
        return { ...todoItem, completed: !todoItem.completed }
      } else return todoItem;
    });
  }

  public deleteTodo(todo: Todo): void;
  public deleteTodo(todo: number): void;
  public deleteTodo(todo: unknown): void {

    let todoId = this.getTodoId(todo);
    this.inMemoryData = this.inMemoryData.filter(todoItem => {
      return todoItem.id !== todoId
    });
  }


  private getTodoId(todo: unknown): number {
    if (typeof todo === "number") {
      return todo
    } else if (typeof todo === "object") {
      return (todo as Todo).id!
    } else {
      throw new Error(`invalid input type ${typeof todo}`)
    }
  }

}
