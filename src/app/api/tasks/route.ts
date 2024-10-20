import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/lib/models/Task';

export async function GET() {
    await connectToDatabase();
    const tasks = await Task.find();
    return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: Request) {
    await connectToDatabase();
    const body = await request.json();
    const newTask = new Task(body);
    await newTask.save();
    return NextResponse.json(newTask, { status: 201 });
}
