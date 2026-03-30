import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Todo } from '../../shared/todo';

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
    this.inMemoryData.push(newTodo);
    return of(newTodo);
  }
}
