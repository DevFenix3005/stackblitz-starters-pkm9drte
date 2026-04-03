import { Component, input, InputSignal, ViewChild, ElementRef, inject, signal, WritableSignal, effect, computed, OnChanges, SimpleChanges } from '@angular/core';
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
  styleUrl: './todo-list.css'
})
export class TodoList {
  todos: InputSignal<Todo[]> = input.required();
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;
  private document: Document = inject(DOCUMENT);
  protected todoSelected: TodoNullable = null;
  protected textForFilter: WritableSignal<string> = signal("Something");

  protected filteredTodos = computed(() => {
    const filterValue: string = this.textForFilter();
    const inputTodos: Todo[] = this.todos();
    console.log(filterValue);
    console.log(inputTodos);
    if (inputTodos && filterValue) {
      const filterValueNormal = filterValue.trim();
      return inputTodos.filter(todo => {
        return todo.title.includes(filterValueNormal);
      });
    } else return inputTodos;
  });

  protected qtyOfTodoFiltered = computed(() => {
    const filteredTodos = this.filteredTodos();
    return filteredTodos.length;
  });

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


  updateText($event: Event): void {
    if ($event.target) {
      const filterInput = $event.target as HTMLInputElement;
      this.textForFilter.set(filterInput.value);
    }
  }

}
