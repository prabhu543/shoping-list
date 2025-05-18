import ConnectDB from '@/lib/db';
import { Todo } from '@/lib/model/todos';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		await ConnectDB();
		const items = await Todo.find();
		return NextResponse.json(items, { status: 200 });
	} catch (error) {
		return new NextResponse(`failed to load  ${error}`, { status: 500 });
	}
};

export const POST = async (req: Request) => {
	try {
		const res = await req.json();
		await ConnectDB();
		const items = new Todo(res);
		await items.save();
		return NextResponse.json(items, { status: 200 });
	} catch (error) {
		return new NextResponse(`failed to load  ${error}`, { status: 500 });
	}
};

export const DELETE = async (req: Request) => {
	try {
    const res = await req.json();
    const {id} = res;

    await ConnectDB();
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return NextResponse.json( deletedTodo , {status : 200})
	} catch (error) {
		return new NextResponse(`failed to load  ${error}`, { status: 500 });
	}
};
