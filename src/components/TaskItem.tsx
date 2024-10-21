import { Task } from '@/lib/types';

interface TaskItemProps {
    task: Task;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-gray-600">Status: {task.status}</p>
            <p className="text-gray-600">Assignee: {task.assignee}</p>
            <p className="text-gray-600">Priority: {task.priority}</p>
            <p className="text-gray-600">Due Date: {task.dueDate}</p>
            <p className="text-gray-600">Description: {task.description}</p>
            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 text-white px-4 py-1 mt-2 rounded"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-1 mt-2 rounded"
                    onClick={() => onDelete(task._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
