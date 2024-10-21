'use client';

import * as Yup from 'yup';
import { useFormik } from 'formik';

interface Task {
    _id: number;
    title: string;
    description?: string;
    assignee: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Completed';
}

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: any) => void;
    existingTask?: any;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, existingTask }) => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        dueDate: Yup.string().required('Due Date is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: existingTask?.title || '',
            description: existingTask?.description || '',
            assignee: existingTask?.assignee || 'user-1',
            priority: existingTask?.priority || 'Low',
            dueDate: existingTask?.dueDate || '',
            status: existingTask?.status || 'To Do',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const newTask: Task = {
                _id: existingTask ? existingTask._id : Date.now(),
                ...values,
            };
            onSave(newTask);
            formik.resetForm();
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 w-full">
            <div className="bg-white rounded-lg p-4 shadow-lg w-1/4">
                <h2 className="text-lg font-semibold mb-2">{existingTask ? 'Edit Task' : 'Create Task'}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Title</label>
                        <input
                            type="text"
                            {...formik.getFieldProps('title')}
                            className="border rounded p-2 w-full"
                        />
                        {formik.touched.title && typeof formik.errors.title === 'string' && (
                            <div className="text-red-500">{formik.errors.title}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block">Description</label>
                        <textarea
                            {...formik.getFieldProps('description')}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Assignee</label>
                        <select
                            {...formik.getFieldProps('assignee')}
                            className="border rounded p-2 w-full"
                        >
                            <option value="user-1">Test User 1</option>
                            <option value="user-2">Test User 2</option>
                            <option value="user-3">Test User 3</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block">Priority</label>
                        <select
                            {...formik.getFieldProps('priority')}
                            className="border rounded p-2 w-full"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block">Due Date</label>
                        <input
                            type="date"
                            {...formik.getFieldProps('dueDate')}
                            className="border rounded p-2 w-full"
                        />
                        {formik.touched.dueDate && typeof formik.errors.dueDate === 'string' && (
                            <div className="text-red-500">{formik.errors.dueDate}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block">Status</label>
                        <select
                            {...formik.getFieldProps('status')}
                            className="border rounded p-2 w-full"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2"
                    >
                        {existingTask ? 'Update Task' : 'Create Task'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-2 bg-gray-300 rounded px-4 py-2"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
