//Fetches Todos from the server and appends them to the list

async function fetchTodos() {
  const res = await fetch("http://localhost:5000/todo/", {
    method: "GET",
  });
  console.log(res);
  const todos = await res.json();

  console.log(todos);
  todos.forEach((todo) => {
    appendTodos(todo);
  });
}

//Append Todos to the list
function appendTodos(todo) {
  var ul = document.getElementById("myUL");
  var li = document.createElement("li");
  var span = document.createElement("span");
  span.setAttribute("data-id", todo._id);
  span.appendChild(document.createTextNode(todo.text));

  li.appendChild(span);
  li.setAttribute("data-id", todo._id);

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", deleteTodo.bind(null, todo._id));
  li.appendChild(deleteButton);

  if (todo.status) {
    li.classList.add("checked");
  }

  ul.appendChild(li);
}

async function addTodos() {
  const todo = document.getElementById("myInput").value;
  if (todo.trim() === "") return;

  const res = await fetch("http:localhost:5000/todo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: todo,
    }),
  });

  const data = await res.json();
  appendTodos(data);
  document.getElementById("myInput").value = "";
}

async function toggleTodo(id, status) {
  try {
    const res = await fetch("http:localhost:5000/todo/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        _id: id,
      }),
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch("http://localhost:5000/todo/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const data = await res.json();
    const todo = document.querySelector(`[data-id="${id}"]`);
    todo.remove();
  } catch (err) {
    console.log(err);
  }
}

//Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  async function (ev) {
    if (ev.target.tagName === "LI") {
      const todoItem = ev.target;
      if (todoItem.classList.contains("checked")) {
        todoItem.classList.remove("checked");
        const id = todoItem.getAttribute("data-id");
        await toggleTodo(id, false);
      } else {
        todoItem.classList.add("checked");
        const id = todoItem.getAttribute("data-id");
        await toggleTodo(id, true);
      }
    }
  },
  false
);

async function updateTodoText(id, text) {
  try {
    const res = await fetch(`http://localhost:5000/todo/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        _id: id,
      }),
    });
    const data = await res.json();
  } catch (e) {
    console.log(e);
  }
}

list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "SPAN") {
      const todoItem = ev.target;
      const todoText = todoItem.textContent;
      todoItem.innerHTML = `<input type="text" value="${todoText}" />`;
      const input = todoItem.querySelector("input");
      input.focus();

      input.addEventListener("blur", async function () {
        const newTodoText = input.value;
        todoItem.innerHTML = newTodoText;
        const id = todoItem.getAttribute("data-id");
        await updateTodoText(id, newTodoText);
      });
    }
  },
  false
);

const init = async () => {
  fetchTodos();
};

init();
