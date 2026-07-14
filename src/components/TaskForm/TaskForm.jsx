import { useState } from "react";

export default function TaskForm({ onAddTask }) {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault(); // Evita que la página se recargue

        if (!text.trim()) return;

        onAddTask(text);

        setText("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 mb-6"
        >
            <input
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Escribe una tarea..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
                Agregar
            </button>
        </form>
    );
}