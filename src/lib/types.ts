export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
    _id: string;
    title: string;
    status: TaskStatus;
    assignee: string;
    priority: TaskPriority;
    dueDate: string;
    description: string;
}
