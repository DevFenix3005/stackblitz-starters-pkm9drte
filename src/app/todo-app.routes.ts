import { Routes } from '@angular/router';
import { TodoDashboard } from './features/todo/todo-dashboard/todo-dashboard';

export const routes: Routes = [
  {
    component: TodoDashboard,
    path: '',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
