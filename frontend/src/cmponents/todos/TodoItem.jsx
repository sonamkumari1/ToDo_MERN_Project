import React, { useCallback, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);

  const onDelete = useCallback(async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }, [deleteTodo]);

  const onUpdate = async () => {
    try {
      const updatedTodo = { ...todo, title: updatedTitle, description: updatedDescription };
      await updateTodo(updatedTodo);
      setEditing(false); // Exit editing mode after update
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <>
      <div className="p-4 border rounded shadow-md bg-white mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {editing ? (
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="text-xl font-bold mb-2 flex-1 focus:outline-none"
              />
            ) : (
              <>
                <h3
                  className={`text-xl font-bold mb-2 ${todo.completed ? "line-through text-gray-400" : ""}`}
                  style={{ flex: "1" }}
                >
                  {todo.title}
                </h3>
               
              </>
            )}
          </div>
          <div className="flex items-center">
            {editing ? (
              <FaCheck 
                onClick={onUpdate}
                className="text-green-500 hover:text-green-700 text-2xl cursor-pointer"
              />
            ) : (
              <HiOutlinePencilSquare
                onClick={() => setEditing(true)}
                className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer"
              />
            )}
            <RiDeleteBin6Line
              onClick={() => onDelete(todo._id)}
              className="text-red-500 hover:text-red-700 text-2xl ml-2 cursor-pointer"
            />
          </div>
        </div>

        <p className="text-gray-600">{editing ? (
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="text-gray-600 resize-none w-full focus:outline-none"
          />
        ) : (
          todo.description
        )}</p>
      </div>
    </>
  );
};

export default TodoItem;
