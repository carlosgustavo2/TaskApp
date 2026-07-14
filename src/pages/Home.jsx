import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";

export default function Home() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filter, setFilter] = useState("all");

    const addTask = (title) => {

        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            completed: false
        };

        setTasks([...tasks, newTask]);
    };


    const deleteTask = (id) => { 
        setTasks(tasks.filter(task => task.id !== id));
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

    };


    const completedTasks = tasks.filter(task => task.completed).length;

    const pendingTasks = tasks.filter(task => !task.completed).length;

    const filteredTasks = tasks.filter(task => {

        if (filter === "completed") {
            return task.completed;
        }

        if (filter === "pending") {
            return !task.completed;
        }

        return true;

    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        return a.completed - b.completed;
    });

    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">

            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
                📋 Task Manager
            </h1>

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

            </div>

            <TaskForm onAddTask={addTask} />

            <TaskList
                tasks={sortedTasks}
                onDeleteTask={deleteTask}
                onToggleTask={toggleCompleted}
                onEditTask={editTask}
            />
        </div>
    );  
}    