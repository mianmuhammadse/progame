import { PrismaClient } from '@prisma/client';
import { sendNotification } from './notificationService';

const prisma = new PrismaClient();

export const getTasksByProject = async (projectId: number) => {
  return await prisma.task.findMany({
    where: { projectId },
  });
};

export const createTask = async (data: any) => {

  const task = await prisma.task.create({
    data
  });

  await sendNotification('task_channel', {
    action: 'taskCreated',
    task: task,
  });

  return task;
};

export const updateTask = async (id: number, data: any) => {
  const task = await prisma.task.update({
    where: { id },
    data,
  });

  await sendNotification('task_channel', {
    action: 'taskUpdated',
    task: task,
  });

  return task;
};

export const deleteTask = async (id: number) => {
  const found = await exists(id);
  if (!found) {
    return {
      message: 'Task not found',
      status: 404,
    };
  }
  const task = await prisma.task.delete({
    where: { id },
  });

  await sendNotification('task_channel', {
    action: 'taskDeleted',
    task: task,
  });

  return task;
};

const exists = async (id: number) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  return !!task;
};
