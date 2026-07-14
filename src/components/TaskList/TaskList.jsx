import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, 
                                    onDeleteTask,
                                    onToggleTask,
                                    onEditTask }) {

    if (tasks.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No hay tareas todavía 📝
            </div>
        );
    }
    
    return (

        <div>

            <h2 className="text-xl font-bold mb-4">
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