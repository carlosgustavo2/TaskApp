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
    onEditTask
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

        <div className="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">

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
                                className={`text-lg font-semibold transition-all duration-300 ${
                                    task.completed
                                        ? "line-through text-gray-400 opacity-70"
                                        : "text-gray-800"
                                }`}
                            >
                                {task.title}
                            </h3>

                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
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

            <div className="flex gap-2 ml-4">

                {
                    editing ? (

                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl shadow-sm hover:scale-110 transition-all"
                            title="Guardar"
                        >
                            <FaSave />
                        </button>

                    ) : (

                        <button
                            onClick={() => setEditing(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg"
                            title="Editar"
                        >
                            <FaEdit />
                        </button>

                    )
                }

                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                    title="Eliminar"
                >
                    <FaTrash />
                </button>

            </div>

        </div>

    );

}