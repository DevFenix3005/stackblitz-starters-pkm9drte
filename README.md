## Instructions to integrate a text-based filter into the Todo List view

Add a **text-based filter** to the `TodoList` Angular component so users can search todos by the `title` field in real time.

---

### ⚠️ Scope and constraints (IMPORTANT)

* The filter **must ONLY apply to the `title` field** of each `Todo`.
* The implementation **must be done exclusively within the `TodoList` component**.
* **No other components, services, or modules should be modified.**
* The existing data structure (`Todo` interface) must remain unchanged.
* The feature must work entirely with the data received through the existing `@Input() todos`.

---

### Goal

The view should include a text input that allows the user to filter the displayed todos by matching the entered text against the `title` field.

The filtering must:

* Be case-insensitive
* Support partial matches
* Update the list in real time as the user types

---

### Implementation details

#### 1. Add a filter state to the component

In the `TodoList` component, create a property to store the current search text entered by the user.

Example:

* Add a `filterText: string = ''` property.

---

#### 2. Create a derived list for filtered todos

Add a computed or derived way to return only the todos that match the current filter text.

This logic must:

* Use **only the `title` field** for comparison
* Return all todos when the filter is empty
* Perform case-insensitive comparison
* Trim unnecessary spaces from the input

A recommended approach is to create a getter such as `filteredTodos`.

---

#### 3. Update the template to include a text input

Add a text input above the todo list.

The input should:

* Be bound to the `filterText` property
* Update the filtered results in real time
* Not require changes outside this component

Suggested placeholder:

* `"Search todos by title..."`

---

#### 4. Render the filtered list instead of the full list

Replace the current iteration over `todos` with an iteration over the filtered collection.

Current:

* `@for (item of todos; track item.id)`

New:

* Iterate over `filteredTodos`

---

#### 5. Update the empty state behavior

Adjust the empty state logic to handle filtering:

* If `todos` is empty → `"No todos in the list"`
* If `todos` has items but `filteredTodos` is empty → `"No todos match your search"`

---

#### 6. Update the footer count

Update the footer to reflect the number of visible todos after filtering.

Recommended:

* Show filtered count
* Optionally include total count (e.g., `2 of 8 todos`)

---

### Suggested component changes

Only the `TodoList` component should be modified.

It should include:

* A `filterText` property
* A `filteredTodos` getter or filtering function based **only on `title`**

No changes should be made to:

* The `Todo` interface
* Parent components
* Services or external data sources

---

### Suggested template changes

Only the template of `TodoList` should be updated to:

* Add a search input
* Render `filteredTodos`
* Update empty-state messaging
* Update footer count

---

### Acceptance criteria

1. A text input is displayed above the todo list.
2. The user can filter todos by typing text that matches the `title`.
3. Filtering is:

   * Case-insensitive
   * Based **only on the `title` field**
4. Partial matches are supported.
5. When the input is empty, all todos are displayed.
6. No other components or services are modified.
7. The feature is fully contained within the `TodoList` component.
8. The UI updates in real time as the user types.