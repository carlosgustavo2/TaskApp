import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import toast from "react-hot-toast";

export default function Home() {

    // ==========================
    // Estados
    // ==========================

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    // ==========================
    // Funciones
    // ==========================

    const addTask = (title) => {

        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTasks([...tasks, newTask]);

        toast.success(`"${title}" agregada`, {
            icon: "📋",       
        });
    };



    const deleteTask = (id) => {

        const deletedTask = tasks.find(task => task.id === id);

        setTasks(tasks.filter(task => task.id !== id));

        toast.success(`"${deletedTask.title}" eliminada`, {
            icon: "🗑️",
        });

    };

    const clearCompleted = () => {

        const completedCount = tasks.filter(task => task.completed).length;

        setTasks(
            tasks.filter(task => !task.completed)
        );

        if (completedCount > 0) {
            toast.success(`${completedCount} tareas eliminadas`, {
                icon: "🧹",
            });
        }

    };

    const toggleCompleted = (id) => {

        setTasks(

            tasks.map(task =>

                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task

            )

        );

    };

    const editTask = (id, newTitle) => {

        if (!newTitle.trim()) return;

        setTasks(
            tasks.map(task =>
                task.id === id
                    ? { ...task, title: newTitle }
                    : task
            )
        );

        toast.success(`"${newTitle}" actualizada`, {
            icon: "✏️",
        });

    };

    // ==========================
    // Estadísticas
    // ==========================

    const completedTasks = tasks.filter(task => task.completed).length;

    const pendingTasks = tasks.filter(task => !task.completed).length;

    // ==========================
    // Filtrar
    // ==========================

    const filteredTasks = tasks.filter(task => {

        const matchesFilter =
            filter === "all"
                ? true
                : filter === "completed"
                    ? task.completed
                    : !task.completed;

        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;

    });

    // ==========================
    // Ordenar
    // ==========================

    const sortedTasks = [...filteredTasks].sort((a, b) => {

        return a.completed - b.completed;

    });

    // ==========================
    // LocalStorage
    // ==========================

    useEffect(() => {

        localStorage.setItem("tasks", JSON.stringify(tasks));

    }, [tasks]);

    // ==========================
    // Vista
    // ==========================

    return (

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-gray-200">
            <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-2">
                📋 Task Manager
            </h1>
            <p className="text-center text-gray-500 mb-8">
                Organiza tus tareas de forma sencilla y rápida 🚀
            </p>

            {/* Estadísticas */}

            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-500">Total</h3>
                    <p className="text-2xl font-bold">{tasks.length}</p>
                </div>

                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-500">Pendientes</h3>
                    <p className="text-2xl font-bold">{pendingTasks}</p>
                </div>

                <div className="bg-green-100 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-500">Completadas</h3>
                    <p className="text-2xl font-bold">{completedTasks}</p>
                </div>

            </div>

            {/* Filtros */}

            <div className="flex justify-center gap-3 mb-6">

                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded ${
                        filter === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Todas
                </button>

                <button
                    onClick={() => setFilter("pending")}
                    className={`px-4 py-2 rounded ${
                        filter === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Pendientes
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded ${
                        filter === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Completadas
                </button>

                    <button
                        onClick={clearCompleted}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        🗑 Limpiar completadas
                    </button>
            </div>

            {/* Buscador */}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="🔍 Buscar tarea..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* Formulario */}

            <TaskForm onAddTask={addTask} />

            {/* Lista */}

            <TaskList
                tasks={sortedTasks}
                onDeleteTask={deleteTask}
                onToggleTask={toggleCompleted}
                onEditTask={editTask}
            />

        </div>

    );

}