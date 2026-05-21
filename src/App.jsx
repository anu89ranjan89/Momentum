import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import FilterButtons from "./components/FilterButtons";

function App() {
  // Load todos from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // States
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  // Toggle Complete
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit Todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
  };

  // Filter + Search
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return todo.completed && matchesSearch;
    }

    if (filter === "pending") {
      return !todo.completed && matchesSearch;
    }

    return matchesSearch;
  });

  return (
    <div
      className={`min-h-screen bg-cover bg-center flex items-center justify-center p-5 transition-all duration-500 ${
        darkMode ? "text-white" : "text-black"
      }`}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Card */}
      <div
        className={`relative z-10 w-full max-w-2xl p-8 rounded-3xl backdrop-blur-lg border shadow-2xl ${
          darkMode
            ? "bg-black/40 border-white/20"
            : "bg-white/50 border-black/10"
        }`}
      >
        {/* Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Todo Form */}
        <TodoForm addTodo={addTodo} />

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-3 rounded-xl outline-none mb-5 ${
            darkMode
              ? "bg-white/10 text-white placeholder-gray-300"
              : "bg-black/10 text-black placeholder-gray-600"
          }`}
        />

        {/* Filters */}
        <FilterButtons filter={filter} setFilter={setFilter} />

        {/* Todo List */}
        <div className="mt-5">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))
          ) : (
            <div className="text-center py-10 opacity-70">
              No tasks found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center opacity-70">
          {todos.filter((todo) => !todo.completed).length} tasks remaining
        </div>
      </div>
    </div>
  );
}

export default App;
