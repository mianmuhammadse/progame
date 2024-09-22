import 'dotenv/config';
import { createServer } from 'http';
import { Client } from 'pg';
import path from 'path';
import fs from 'fs';

const logFilePath = path.join(__dirname, 'logs', 'combined.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const log = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = data ? `${timestamp} - ${message} - ${JSON.stringify(data)}\n` : `${timestamp} - ${message}\n`;
  logStream.write(logMessage);
};

const pgClient = new Client({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DIALECT,
});

const channels = ['project_channel', 'task_channel'];

(async () => {
	try {
		await pgClient.connect();
		console.log('Connected to the database');

		for (const channel of channels) {
			await pgClient.query(`LISTEN ${channel}`);
			console.log(`Listening for notifications on ${channel}`);
		}

		pgClient.on('notification', async (msg: any) => {
			const { channel, payload } = msg;
			const data = JSON.parse(payload);

			if (channel === 'project_channel') {
				const { action, project } = data;
				switch(action) {
					case 'projectCreated':
						log('Project created:', project);
						break;
					case 'projectUpdated':
						log('Project updated:', project);
						break;
					case 'projectDeleted':
						log('Project deleted:', project);
						break;
				}
			} else if (channel === 'task_channel') {
				const { action, task } = data;
				switch(action) {
					case 'taskCreated':
						log('Task created:', task);
						break;
					case 'taskUpdated':
						log('Task updated:', task);
						break;
					case 'taskDeleted':
						log('Task deleted:', task);
						break;
				}
			}
		});
	} catch (error) {
		console.error('Error connecting to the database or setting up LISTEN:', error);
	}
})();

console.log('Logger service is listening for events on channels...');

const hostname = '127.0.0.1';
const port = 4000;

const server = createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
