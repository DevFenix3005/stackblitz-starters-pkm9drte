import { Component, inject, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Todo } from '../../../shared/models/todo';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  @Output()
  addTodoHandler = new EventEmitter<Todo>();
  private fb = inject(FormBuilder);
  protected todoForm: FormGroup = this.fb.group({
    title: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    description: ['',
      Validators.max(150)
    ]
  });

  addTodo(event: Event) {
    event.preventDefault();
    if (this.todoForm.valid) {
      const newTodo: Todo = { ...this.todoForm.value, completed: false };
      this.addTodoHandler.emit(newTodo);
      this.todoForm.reset();
    }
  }
}
