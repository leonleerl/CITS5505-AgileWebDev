// const container = document.getElementById("container");
// const items = document.getElementsByClassName("item");
// const listItems = document.getElementsByTagName("li");
// const title = document.querySelector("#title");
// const allItems = document.querySelectorAll(".item");

// title.textContent = "DOM and Events title";
// // title.innerHTML = "<span>11DOM</span> and Events";

// const newItem = document.createElement("li");
// newItem.textContent = "Item 4";
// newItem.classList.add("item");

// const list = document.getElementById("itemList");
// // list.appendChild(newItem);
// list.insertBefore(newItem, list.firstChild);

// // newItem.remove();
// list.removeChild(newItem);

// let count = 4;

// const button = document.getElementById("addBtn");

// button.addEventListener("click", () => {
//   const input = document.getElementById("input");
//   if (input.value.trim() === "") {
//     alert("Please enter a valid item");
//     return;
//   }
//   const newItem = document.createElement("li");
//   newItem.textContent = input.value;
//   list.appendChild(newItem);
//   count++;
//   input.value = "";
// });

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
