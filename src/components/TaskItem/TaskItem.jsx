import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

export default function TaskItem({
    task,
    onDeleteTask,
    onToggleTask,
    onEditTask
}) {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(task.title);

    const handleSave = () => {

        onEditTask(task.id, text);

        setEditing(false);

    };

    return (

        <div className="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-center gap-3 flex-1">

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                {
                    editing ? (

                        <form
                                className="border border-gray-300 rounded-xl px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                        >

                            <input
                                className="border rounded px-2 py-1 w-full"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                autoFocus
                            />

                        </form>

                        ) : (

                        <p
                            className={`text-lg font-medium transition-colors ${
                                task.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-800"
                            }`}
                        >
                            {task.title}
                        </p>

                    )
                }

            </div>

            <div className="flex gap-2">

                {
                    editing ?

                        <button
                            onClick={handleSave}
                            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"                        >
                            <FaSave />
                        </button>

                        :

                        <button
                            onClick={() => setEditing(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"                        >
                            <FaEdit />
                        </button>

                }

                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"                >
                    <FaTrash />
                </button>

            </div>

        </div>

    );
}