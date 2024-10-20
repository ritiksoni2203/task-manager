import { TaskStatus } from '../lib/types';

interface TaskFilterProps {
  currentStatus: TaskStatus | 'All';
  onChange: (status: TaskStatus | 'All') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentStatus, onChange }) => {
  return (
    <div>
      <label className="font-semibold">Status :</label>
      <select
        value={currentStatus}
        onChange={e => onChange(e.target.value as TaskStatus | 'All')}
        className="ml-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
