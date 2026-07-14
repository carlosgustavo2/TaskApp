import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, onDeleteTask, onToggleTask }) {

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
                    />

                ))
            }

        </div>

    );
}