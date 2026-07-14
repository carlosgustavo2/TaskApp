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

        <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-4 mb-3 hover:shadow-md transition">

            <div className="flex items-center gap-3 flex-1">

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                />

                {
                    editing ? (

                        <form
                            className="flex-1"
                            onSubmit={(e) => {
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
                            className={`text-lg ${
                                task.completed
                                    ? "line-through text-gray-400"
                                    : ""
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
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                        >
                            <FaSave />
                        </button>

                        :

                        <button
                            onClick={() => setEditing(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                        >
                            <FaEdit />
                        </button>

                }

                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                    <FaTrash />
                </button>

            </div>

        </div>

    );
}