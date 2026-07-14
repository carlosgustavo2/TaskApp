export default function TaskItem({ task, onDeleteTask, onToggleTask }) {

     return (

        <div className="flex justify-between items-center border rounded p-3 mb-3 shadow">

            <div className="flex items-center gap-3">

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                />

                <p
                    className={
                        task.completed
                            ? "line-through text-gray-400"
                            : ""
                    }
                >
                    {task.title}
                </p>

            </div>

            <button
                onClick={() => onDeleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >
                Eliminar
            </button>

        </div>

    );
}