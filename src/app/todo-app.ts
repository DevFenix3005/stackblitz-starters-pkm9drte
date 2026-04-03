import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faRobot } from '@fortawesome/free-solid-svg-icons';

import { ThemeFacade, ThemeMode } from "./core/theme.facade";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule],
  template: `
  <header class="container">
    <nav>
      <ul>
        <li><h4>{{ title() }}</h4></li>
      </ul>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Products</a></li>
        <li>
          <a href="#" (click)="toogleTheme()">
            <fa-icon [icon]="faTheme()" [animation]="animtation() ? 'beat-fade' : undefined" [fixedWidth]="true"/>
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="container">
    <router-outlet/>
  </main>
  <footer class="container">
    <hr/>
    <small>&reg; Roberto D. Cazarin</small>
  </footer>
  `,
})
export class TodoApp {
  private themeFacade = inject(ThemeFacade);

  protected title = signal('🗒️TodoApp');
  protected animtation = signal(false);

  protected mode = this.themeFacade.mode;

  faTheme = computed(() => {
    const mode = this.mode();
    if (mode === 'system') {
      return faRobot
    } else if (mode === 'dark') {
      return faMoon
    } else {
      return faSun
    }
  })

  toogleTheme() {
    this.animtation.set(true);
    setTimeout(() => {
      this.mode.update(value => {
        if (value === 'light') {
          return 'dark';
        } else if (value === 'dark') {
          return 'system';
        } else {
          return 'light';
        }
      })
      this.animtation.set(false);
    }, 333);
  }

}
