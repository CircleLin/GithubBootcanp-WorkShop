const STORAGE_KEY = "todo-items";

const todoTextInput = document.getElementById("todoText");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const emptyHint = document.getElementById("emptyHint");
const pendingCount = document.getElementById("pendingCount");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const filterButtons = document.querySelectorAll(".filter-button");

const THEME_STORAGE_KEY = "todo-theme";
let currentFilter = "all";

let todos = loadTodos();

initTheme();

// 初始化畫面
render();

// 綁定新增按鈕事件
addButton.addEventListener("click", handleAddTodo);

themeToggle.addEventListener("click", toggleTheme);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    render();
  });
});

// 綁定輸入框 Enter 事件，方便快速新增
todoTextInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAddTodo();
  }
});

function handleAddTodo() {
  const text = todoTextInput.value.trim();

  // 輸入為空白時不新增
  if (!text) {
    return;
  }

  const todo = {
    id: Date.now().toString(),
    text,
    completed: false
  };

  todos.push(todo);
  todoTextInput.value = "";
  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos();
  render();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

function render() {
  todoList.innerHTML = "";

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") {
      return !todo.completed;
    }

    if (currentFilter === "completed") {
      return todo.completed;
    }

    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";

    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `切換 ${todo.text} 完成狀態`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除 ${todo.text}`);
    deleteButton.addEventListener("click", () => removeTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.appendChild(item);
  });

  const pending = todos.filter((todo) => !todo.completed).length;
  pendingCount.textContent = `未完成:${pending} 項`;

  // 依照目前篩選結果顯示對應提示文字
  emptyHint.textContent = getEmptyHintText();
  emptyHint.style.display = visibleTodos.length === 0 ? "block" : "none";
}

function getEmptyHintText() {
  if (todos.length === 0) {
    return "還沒有任何待辦事項,新增一個吧!";
  }

  return currentFilter === "active"
    ? "太棒了,沒有未完成的事項!"
    : "還沒有已完成的事項。";
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";

  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    // 只接受陣列格式，避免資料毀損造成錯誤
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
