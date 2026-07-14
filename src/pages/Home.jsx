import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";

export default function Home() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

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


    const completedTasks = tasks.filter(task => task.completed).length;

    const pendingTasks = tasks.filter(task => !task.completed).length;

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    return (
        <div className="max-w-xl mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-2">
                Task Manager
            </h1>

            <div className="flex gap-6 mb-6">
                <p>
                    <strong>Total:</strong> {tasks.length}
                </p>
                <p>
                    <strong>Pendientes:</strong> {pendingTasks}
                </p>
                <p>
                    <strong>Completadas:</strong> {completedTasks}
                </p>
            </div>

            <TaskForm onAddTask={addTask} />

            <TaskList tasks={tasks} 
                      onDeleteTask={deleteTask} 
                      onToggleTask={toggleCompleted}/>

        </div>
    );
}