import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";
import toast from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";
import { supabase } from "../lib/supabase";

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

    {/*DARK MODE*/}
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.theme === "dark";
    });

    // ==========================
    // Cargar tareas desde Supabase
    // ==========================
    const loadTasks = async () => {

        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {

            console.error(error);
            return;

        }

        setTasks(data);

    };

    // ==========================
    // Funciones
    // ==========================
    const addTask = async (title) => {

        if (!title.trim()) return;

        const { error } = await supabase
            .from("tasks")
            .insert([
                {
                    title,
                    completed: false
                }
            ]);

        if (error) {
            console.error(error);
            return;
        }

        await loadTasks();

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
    // SUPABASE CONNECTION
    // ==========================
    useEffect(() => {

        loadTasks();

    }, []);

    // ==========================
    // DARK MODE
    // ==========================
    useEffect(() => {

        if (darkMode) {

            document.documentElement.classList.add("dark");

            localStorage.theme = "dark";

        } else {

            document.documentElement.classList.remove("dark");

            localStorage.theme = "light";

        }

    }, [darkMode]);

    // ==========================
    // Vista
    // ==========================
    return (

        <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white rounded-2xl shadow-xl p-5 sm:p-8 w-full max-w-5xl mx-auto transition-all duration-500">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-11 h-11 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center hover:scale-110 transition"
                >
                    { darkMode
                        ? <FaSun className="text-yellow-300"/>
                        : <FaMoon className="text-slate-700"/>
                    }
                </button>

            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-2">
                📋 Task Manager
            </h1>
            <p className="text-center text-base sm:text-xl text-gray-500 mb-8">
                Organiza tus tareas de forma sencilla y rápida 🚀
            </p>

            {/* Estadísticas */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-600 dark:text-blue-300">
                        Total
                        </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {tasks.length}
                    </p>
                </div>

               <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-600 dark:text-yellow-300">
                        Pendientes
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {pendingTasks}
                    </p>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
                    <h3 className="text-sm text-gray-600 dark:text-green-300">
                        Completadas
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {completedTasks}
                    </p>
                </div>

            </div>

            {/* Filtros */}

            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">

                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded ${
                        filter === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-slate-700"
                    }`}
                >
                    Todas
                </button>

                <button
                    onClick={() => setFilter("pending")}
                    className={`px-4 py-2 rounded ${
                        filter === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 dark:bg-slate-700"
                    }`}
                >
                    Pendientes
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded ${
                        filter === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 dark:bg-slate-700"
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
                    className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                darkMode={darkMode}
            />

        </div>

    );

}