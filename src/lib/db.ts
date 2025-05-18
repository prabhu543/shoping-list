import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const ConnectDB = async () => {
	const connectedState = mongoose.connection.readyState;
	if (connectedState == 1) {
		console.log('connected already');
		return;
	} else if (connectedState == 2) {
		console.log('connecting....');
		return;
	}

	try {
		await mongoose.connect(MONGODB_URI!, {
			dbName: 'TodoList',
			bufferCommands: true,
		});
		console.log('connected');
	} catch (error) {
		throw new Error(`failed due to erroe : ${error}`);
	}
};

export default ConnectDB;
