import { useState } from "react";
import {
    FaTrash,
    FaEdit,
    FaSave,
    FaCalendarAlt
} from "react-icons/fa";

export default function TaskItem({
    task,
    onDeleteTask,
    onToggleTask,
    onEditTask,
    darkMode
}) {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(task.title);

    const handleSave = () => {

        if (!text.trim()) return;

        onEditTask(task.id, text);

        setEditing(false);

    };

    const handleDelete = () => {

        const confirmDelete = window.confirm(
            `¿Deseas eliminar la tarea "${task.title}"?`
        );

        if (confirmDelete) {
            onDeleteTask(task.id);
        }

    };

    const formatDate = (date) => {

        const taskDate = new Date(date);
        const today = new Date();

        const sameDay =
            taskDate.toDateString() === today.toDateString();

        if (sameDay) {

            return `Hoy • ${taskDate.toLocaleTimeString("es-SV", {
                hour: "2-digit",
                minute: "2-digit"
            })}`;

        }

        return taskDate.toLocaleDateString("es-SV", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    };

    return (

        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-5 mb-4 shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn ${
            darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
            }`}
        >
            <div className="flex items-center gap-4 flex-1">

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
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
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                autoFocus
                            />

                        </form>

                    ) : (

                        <div className="flex-1">

                            <h3
                                className={`text-lg font-semibold transition-all duration-300 animate-fadeIn ${
                                    task.completed
                                        ? "line-through text-gray-400 opacity-70"
                                        : "text-gray-500 dark:text-gray-400"
                                }`}
                            >
                                {task.title}
                            </h3>

                            <div className="text-gray-500 dark:text-gray-400">             
                            <FaCalendarAlt />
                                <span>{formatDate(task.createdAt)}</span>
                            </div>

                            <div className="mt-2">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                        task.completed
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {task.completed
                                        ? "✔ Completada"
                                        : "⏳ Pendiente"}
                                </span>
                            </div>

                        </div>

                    )

                }

            </div>

            <div className="flex justify-end gap-2 sm:ml-4">

                {
                    editing ? (

                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"                            
                            title="Guardar"
                        >
                            <FaSave />
                        </button>

                    ) : (

                        <button
                            onClick={() => setEditing(true)}
                            className="bg-yellow-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <FaEdit />
                        </button>

                    )
                }

                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    title="Eliminar"
                >
                    <FaTrash />
                </button>

            </div>

        </div>

    );

}