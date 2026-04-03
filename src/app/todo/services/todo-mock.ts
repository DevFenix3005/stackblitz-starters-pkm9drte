import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Todo } from '../../shared/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoMock {
  private inMemoryData: Todo[] = [
    {
      id: 1,
      title: "Do the laundry",
      completed: false
    },
    {
      id: 2,
      title: "Walk the dog",
      completed: false
    },
    {
      id: 3,
      title: "Go to the grocery store and buy Milk",
      completed: false
    }

  ];

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
