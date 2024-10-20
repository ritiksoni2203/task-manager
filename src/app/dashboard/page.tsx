'use client';

import { useEffect, useState } from 'react';
import TaskList from '../../components/TaskList';
import TaskFilter from '../../components/TaskFilter';
import { Task, TaskStatus } from '@/lib/types';
import TaskModal from '@/components/TaskModal';
import ClipLoader from 'react-spinners/ClipLoader';

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks');
            const tasksData: Task[] = await response.json();
            setTasks(tasksData);
        };

        fetchTasks();
        setLoading(false);
    }, []);

    const filteredTasks = tasks.filter(task => statusFilter === 'All' || task.status === statusFilter);
    const paginatedTasks = filteredTasks.slice(0, currentPage * itemsPerPage);

    const loadMore = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handleSaveTask = async (task: Task) => {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            const newTask = await response.json();
            setTasks(prevTasks => [...prevTasks, newTask]);
        }

        setModalOpen(false);
    };

    const handleDeleteTask = async (taskId: string) => {
        setLoading(true)
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            setLoading(false)
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Project Dashboard</h1>
            {loading ? (
                <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
                    <ClipLoader color="#3498db" loading={loading} size={50} />
                </div>
            ) : (
                <>
                    <div className='flex items-center mb-4 justify-between'>
                        <TaskFilter currentStatus={statusFilter} onChange={setStatusFilter} />
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => setModalOpen(true)}
                        >
                            Create Task
                        </button>
                    </div>
                    <TaskList tasks={paginatedTasks} onDelete={handleDeleteTask} />
                    {paginatedTasks.length < filteredTasks.length && (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                            onClick={loadMore}
                        >
                            Load More
                        </button>
                    )}

                    <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveTask} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
