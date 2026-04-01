import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from "../../shared/models/todo";

@Pipe({
  name: 'todoFilter',
  pure: false
})
export class TodoFilterPipe implements PipeTransform {

  transform(value: Todo[], filter: string): Todo[] {

    if (filter === "pending") {
      return value.filter(todo => !todo.completed);
    }
    else if (filter === "complete") {
      return value.filter(todo => todo.completed);
    } else {
      return value;
    }
  }

}
