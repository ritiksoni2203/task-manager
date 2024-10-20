import { Task } from '@/lib/types';

interface TaskItemProps {
    task: Task;
    onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-gray-600">Status: {task.status}</p>
            <p className="text-gray-600">Assignee: {task.assignee}</p>
            <p className="text-gray-600">Priority: {task.priority}</p>
            <p className="text-gray-600">Due Date: {task.dueDate}</p>
            <p className="text-gray-600">Description: {task.description}</p>
            <button
                className="bg-red-500 text-white px-4 py-1 mt-2 rounded"
                onClick={() => onDelete(task._id)} // Call the onDelete function with task ID
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
