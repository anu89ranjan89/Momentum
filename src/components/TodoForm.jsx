import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 rounded-xl bg-white/20 outline-none"
      />

      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;