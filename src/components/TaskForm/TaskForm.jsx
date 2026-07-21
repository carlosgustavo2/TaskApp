import { useState } from "react";

export default function TaskForm({ onAddTask }) {

    const [text, setText] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!text.trim()) return;

        onAddTask(text);

        setText("");
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-6"
        >

            <input
                type="text"
                placeholder="Escribe una tarea..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition w-full sm:w-auto"
            >
                Agregar
            </button>

        </form>

    );

}