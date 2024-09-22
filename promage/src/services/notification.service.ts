import { Client } from 'pg';

const pgClient = new Client({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DIALECT,
});

pgClient.connect().then(() => {
	console.log('PostgreSQL connected for notifications');
}).catch(err => {
	console.error('Failed to connect to PostgreSQL for notifications:', err);
});

/**
 * Send a notification to the PostgreSQL channel
 * @param {string} channel - The name of the PostgreSQL channel to send the notification to.
 * @param {object} payload - The payload object to be sent as part of the notification.
 */
export const sendNotification = async (channel: string, payload: object) => {
	const payloadString = JSON.stringify(payload);
	try {
		await pgClient.query(`NOTIFY ${channel}, '${payloadString}'`);
		console.log(`Notification sent on channel ${channel}:`, payload);
	} catch (error) {
		console.error('Error sending notification:', error);
	}
};
