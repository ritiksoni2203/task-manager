import { Schema, Document, model, models } from 'mongoose';

export interface Task extends Document {
  title: string;
  description?: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignee: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  dueDate: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], required: true },
});

export default models.Task || model<Task>('Task', TaskSchema);
