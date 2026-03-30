import { bootstrapApplication } from '@angular/platform-browser';

import { TodoApp } from './app/todo-app';
import { appConfig } from './app/todo-app.config';

bootstrapApplication(TodoApp, appConfig).catch((err) => console.log(err));
