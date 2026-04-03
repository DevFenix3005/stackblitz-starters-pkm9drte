import { Component, ViewChild, ElementRef, inject, Output, EventEmitter, input, InputSignal, computed, signal, WritableSignal } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { Todo } from '../../../shared/models/todo';
import { ElapsedPipe } from '../../../shared/pipes/elapsed-pipe';

const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms

type TodoNullable = Todo | null;

@Component({
  selector: 'app-todo-list',
  imports: [NgClass, ElapsedPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  public todos: InputSignal<Todo[]> = input.required<Todo[]>();
  public loadingTodos: InputSignal<boolean> = input.required<boolean>();
  private filter: WritableSignal<string> = signal<string>("all");
  protected displayedTodos = computed(() => {
    const listOfTodos = this.todos()
    let _filter = this.filter();
    if (_filter === "pending") {
      return listOfTodos.filter(todo => !todo.completed);
    }
    else if (_filter === "complete") {
      return listOfTodos.filter(todo => todo.completed);
    } else {
      return listOfTodos;
    }
  });
  protected qtyOfTodos = computed(() => this.displayedTodos().length);

  @Output() toggleTodo: EventEmitter<number> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<number> = new EventEmitter();

  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;
  private document: Document = inject(DOCUMENT);
  protected todoSelected: TodoNullable = null;

  changeStatus(todo: Todo): void {
    const html = this.document.documentElement;

    html.classList.add(isOpenClass, openingClass)
    setTimeout(() => {
      html.classList.remove(openingClass);
    }, animationDuration);
    this.todoSelected = todo;
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    const html = this.document.documentElement;
    html.classList.add(closingClass);
    setTimeout(() => {
      html.classList.remove(closingClass, isOpenClass);
      this.dialog.nativeElement.close();
      this.todoSelected = null;
    }, animationDuration);
  }

  toggleTodoHandler(): void {
    if (this.todoSelected) {
      this.toggleTodo.emit(this.todoSelected.id);
      this.closeDialog();
    }
  }
  deleteTodoHandler(): void {
    if (this.todoSelected) {
      this.deleteTodo.emit(this.todoSelected.id);
      this.closeDialog();
    }
  }

  filterSelectTodoHandler($event: Event): void {
    console.log($event)
    
    const select = $event.target as HTMLSelectElement;
    const selectValue = select.value.toLocaleLowerCase();
    console.log(selectValue);
    this.filter.set(selectValue);
  }

}
