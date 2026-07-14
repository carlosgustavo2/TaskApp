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
                className="border p-2 flex-1 rounded"
                type="text"
                placeholder="Escribe una tarea..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 rounded"
            >
                Agregar
            </button>
        </form>
    );
}