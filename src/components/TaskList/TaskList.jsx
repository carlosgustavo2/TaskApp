import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, 
                                    onDeleteTask,
                                    onToggleTask,
                                    onEditTask,
                                    darkMode }) {

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">No hay tareas todavía</p>
                <p className="text-sm">Agrega la primera tarea para comenzar 🚀</p>
            </div>
        );
    }
    
    return (

        <div>

            <h2 className="text-3xl font-bold mb-6">
                Lista de tareas
            </h2>

            {
                tasks.length === 0 ? (

                    <div className="text-center py-16">

                        <div className="text-7xl mb-4">
                            📋
                        </div>

                        <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                            No tienes tareas
                        </h3>

                        <p className="text-gray-400 mt-2">
                            Agrega una tarea para comenzar.
                        </p>

                    </div>

                ) : (

                    tasks.map(task => (

                        <TaskItem
                            key={task.id}
                            task={task}
                            onDeleteTask={onDeleteTask}
                            onToggleTask={onToggleTask}
                            onEditTask={onEditTask}
                            darkMode={darkMode}
                        />

                    ))

                )
            }

        </div>

    );
}