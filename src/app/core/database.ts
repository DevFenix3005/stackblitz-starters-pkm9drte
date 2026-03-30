import Dexie, { Table } from 'dexie';
import { Todo } from '../shared/todo';

export class Database extends Dexie {
  // Define tables and their index schemas
  todoItems!: Table<Todo, number>;

  constructor() {
    super('TodoDatabase');
    this.version(1).stores({
      todoItems: '++id, title, completed', // Primary key and indexed fields
    });
    // Open the database
    this.open().catch((err) => {
      console.error(`Open error: ${err.stack || err.message}`);
    });
  }
}

// Export a singleton instance
export const db = new Database();
