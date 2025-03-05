class TodoItem {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.element = this.createElement();
  }

  createElement() {
    const li = document.createElement("li");
    li.innerHTML = `
                    <span class="todo-text">${this.text}</span>
                    <button class="delete-btn">Delete</button>
          `;
    this.addEventListeners(li);
    return li;
  }

  addEventListeners(li) {
    // Toggle completion
    li.querySelector(".todo-text").addEventListener("click", () => {
      this.isCompleted = !this.isCompleted;
      this.element.classList.toggle("completed");
    });

    // Delete todo
    li.querySelector(".delete-btn").addEventListener("click", () => {
      this.element.remove();
    });
  }
}
class TodoList {
  constructor() {
    this.todoForm = document.getElementById("todoForm");
    this.todoInput = document.getElementById("todoInput");
    this.todoList = document.getElementById("todoList");
    this.todos = [];

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTodo();
    });
  }

  addTodo() {
    const todoText = this.todoInput.value.trim();
    if (!todoText) return;

    // Create new TodoItem instance
    const todo = new TodoItem(todoText);
    this.todos.push(todo);

    // Add to DOM
    this.todoList.insertBefore(todo.element, this.todoList.firstChild);

    // Clear input
    this.todoInput.value = "";
  }
}

// Initialize the TodoList
const todoList = new TodoList();
