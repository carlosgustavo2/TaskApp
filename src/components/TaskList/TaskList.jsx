import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, 
                                    onDeleteTask,
                                    onToggleTask,
                                    onEditTask }) {

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No hay tareas todavía</p>
                <p className="text-sm">Agrega la primera tarea para comenzar 🚀</p>
            </div>
        );
    }
    
    return (

        <div>

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
                Lista de tareas
            </h2>

            {
                tasks.map(task => (

                    <TaskItem
                        key={task.id}
                        task={task}
                        onDeleteTask={onDeleteTask}
                        onToggleTask={onToggleTask}
                        onEditTask={onEditTask}
                    />

                ))
            }

        </div>

    );
}