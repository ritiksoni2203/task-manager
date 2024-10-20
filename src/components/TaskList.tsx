import { Task } from '@/lib/types';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TaskList;
