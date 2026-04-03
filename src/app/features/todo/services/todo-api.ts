import { Injectable } from '@angular/core';
import { Observable, of, from, map, mergeMap } from 'rxjs';

import { Todo } from '../../../shared/models/todo';
import { supabase } from '../../../core/supabase';


@Injectable({
  providedIn: 'root',
})
export class TodoApi {

  private databaseName: string = "todos"

  public getTodos(): Observable<Todo[]> {
    return from(supabase.from(this.databaseName).select("*").order("id", { ascending: true }))
      .pipe(map(response => {
        if (response.error) throw response.error;
        return response.data as Todo[];
      }))
  }

  public addTodo(newTodo: Todo): Observable<Todo> {
    return from(supabase.from(this.databaseName).insert([newTodo]).select().single())
      .pipe(map(response => {
        if (response.error) throw response.error;
        return response.data as Todo
      }))
  }

  public toggleTodo(todo: Todo): Observable<Todo>;
  public toggleTodo(todo: number): Observable<Todo>;
  public toggleTodo(todo: unknown): Observable<Todo> {
    let todoId = this.getTodoId(todo);
    return from(
      supabase.rpc("toggle_task_completed", { "todo_id": todoId })
    ).pipe(map(response => {
      if (response.error) throw response.error;
      return response.data as Todo
    }))

  }

  public deleteTodo(todo: Todo): Observable<Todo>;
  public deleteTodo(todo: number): Observable<Todo>;
  public deleteTodo(todo: unknown): Observable<Todo> {
    let todoId = this.getTodoId(todo);
    return from(
      supabase.from(this.databaseName).delete().eq("id", todoId).select().single()
    ).pipe(map(response => {
      if (response.error) throw response.error;
      return response.data as Todo
    }))
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
