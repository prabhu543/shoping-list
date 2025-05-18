'use client';

import { RiDeleteBin4Line } from 'react-icons/ri';
import ConnectDB from '@/lib/db';
import { Todo } from '@/lib/model/todos';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ShoppingItem {
	_id: string;
	item: string;
}

const ShoppingList = () => {
	const [itemInput, setItemInput] = useState<string>('');
	const [items, setItems] = useState<ShoppingItem[]>([]);

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/todo', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ item: itemInput }),
			});
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(`failed to load  ${error}`, { status: 500 });
			return;
		}
		setItemInput('');
		fetchTodos();
	};

	const fetchTodos = async () => {
		const res = await fetch('/api/todo');
		const data = await res.json();
		setItems(data);
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const handleRemoveItem = async (id: string) => {
		await fetch('/api/todo', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id }),
		});
		fetchTodos();
	};

	const deleteBtn = () => (
		<button
			id='clear'
			className='btn-clear w-full mt-5 py-2 px-4 text-gray-800 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 focus:outline-none text-white hover:text-gray-800'
			// onClick={handleClearAll}
		>
			Clear All
		</button>
	);

	return (
		<div className='container max-w-md mx-auto mt-8 p-4'>
			<header className='flex items-center mb-5'>
				<Image
					src={
						'https://raw.githubusercontent.com/skanda-prasaad/Shopping_list/refs/heads/main/note.png'
					}
					alt='List-Icon'
					width={50}
					height={50}
				/>
				<h1 className='text-2xl font-semibold'>Shopping List</h1>
			</header>

			<form
				id='item-form'
				onSubmit={handleAddItem}>
				<div className='mb-4'>
					<input
						type='text'
						className='form-input w-full px-3 py-2 text-lg border border-gray-300 rounded-md outline-none'
						id='item-input'
						name='item'
						placeholder='Enter Item....'
						value={itemInput}
						onChange={(event) => setItemInput(event.target.value)}
					/>
				</div>
				<div className='mb-4'>
					<button
						type='submit'
						className='btn bg-gray-800 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-gray-900'>
						Add Item
					</button>
				</div>
			</form>

			<ul
				id='item-list'
				className='items mt-5 flex flex-wrap'>
				{items.map((item) => (
					<li
						key={item._id}
						className='flex justify-between w-full sm:w-[48%] border border-gray-300 rounded-md p-3 mb-5 mr-2 last:mr-0 font-semibold'>
						{item.item}
						<button
							className='remove-item btn-link text-red-500 focus:outline-none'
							onClick={() => handleRemoveItem(item._id)}>
							{/* You can add an icon here if you have one */}
							<RiDeleteBin4Line />
						</button>
					</li>
				))}
			</ul>

			{items && items.length > 0 && deleteBtn()}
		</div>
	);
};

export default ShoppingList;
