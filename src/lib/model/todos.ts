import { Schema, model, models } from 'mongoose';

const todoSchema = new Schema(
	{
		item: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
export const Todo = models.Todo || model('Todo', todoSchema);
