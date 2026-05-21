import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaCheck,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  // Save edited task
  const handleSave = () => {
    if (!newText.trim()) return;

    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center p-4 bg-white/10 rounded-2xl mb-4 backdrop-blur-lg border border-white/10 shadow-lg"
    >
      {/* Left Side */}
      <div className="flex items-center gap-4 flex-1">
        {/* Complete Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleTodo(todo.id)}
          className={`p-2 rounded-full transition ${
            todo.completed
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
        >
          <FaCheck size={12} />
        </motion.button>

        {/* Task Text / Edit Input */}
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 bg-transparent border-b border-white/30 outline-none text-lg"
          />
        ) : (
          <motion.p
            layout
            className={`text-lg break-words ${
              todo.completed
                ? "line-through opacity-50"
                : ""
            }`}
          >
            {todo.text}
          </motion.p>
        )}
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4 ml-4">
        {/* Edit / Save */}
        {isEditing ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleSave}
            className="text-green-400"
          >
            <FaSave />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsEditing(true)}
            className="text-yellow-400"
          >
            <FaEdit />
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => deleteTodo(todo.id)}
          className="text-red-400"
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
