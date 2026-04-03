import { Component, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Todo } from '../../shared/todo';

const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms

type TodoNullable = Todo | null;

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  @Input() todos!: Todo[];
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;
  private document: Document = inject(DOCUMENT);
  protected todoSelected: TodoNullable = null;

}
