import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/lib/models/Task';
import { ObjectId } from 'mongodb';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const taskId = params.id;
        const result = await Task.findByIdAndDelete(taskId);

        if (!result) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        let taskId = params.id;

        const updatedTask = await request.json();

        const result = await Task.findByIdAndUpdate(new ObjectId(taskId), updatedTask, { new: true });

        if (!result) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}