import { PrismaClient } from '@prisma/client';
import { sendNotification } from './notification.service';

const prisma = new PrismaClient();

export const getAllProjects = async () => {
	return await prisma.project.findMany({
		include: { tasks: true, manager: true },
	});
};

export const createProject = async (data: any) => {
	const { name, description, managerId, startDate, endDate } = data;
	const project = await prisma.project.create({
		data: {
			name,
			description,
			startDate: new Date(),
			endDate: endDate ? new Date(endDate) : null,
			managerId,
		},
	});

	await sendNotification('project_channel', {
		action: 'projectCreated',
		project: project,
	});

	return project;
};

export const getProjectById = async (id: number) => {
	const found = await exists(id);
	if (!found) {
		return {
			message: 'Project not found',
			status: 404,
		};
	}
	return await prisma.project.findUnique({
		where: { id },
		include: { tasks: true, manager: true },
	});
};

export const updateProject = async (id: number, data: any) => {
	const found = await exists(id);
	if (!found) {
		return {
			message: 'Project not found',
			status: 404,
		};
	}
	const project = await prisma.project.update({
		where: { id },
		data,
	});

	await sendNotification('project_channel', {
		action: 'projectUpdated',
		project: project,
	});

	return project;
};

export const deleteProject = async (id: number) => {
	const found = await exists(id);
	if (!found) {
		return {
			message: 'Project not found',
			status: 404,
		};
	}
	await prisma.task.deleteMany({
		where: { projectId: id },
	});

	const project = await prisma.project.delete({
		where: { id },
	});

	await sendNotification('project_channel', {
		action: 'projectDeleted',
		project: project,
	});

	return project;
};

const exists = async (id: number) => {
	const project = await prisma.project.findUnique({
		where: { id },
	});
	return !!project;
};
