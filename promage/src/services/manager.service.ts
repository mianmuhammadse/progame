import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllManagers = async () => {
  return await prisma.manager.findMany({
    include: { projects: true },
  });
};

export const createManager = async (data: any) => {
  const { name, email } = data;
  return await prisma.manager.create({
    data: { name, email },
  });
};

export const getManagerById = async (id: number) => {
  return await prisma.manager.findUnique({
    where: { id },
    include: { projects: true },
  });
};

export const updateManager = async (id: number, data: any) => {
  const { name, email } = data;
  return await prisma.manager.update({
    where: { id },
    data: { name, email },
  });
};

export const deleteManager = async (id: number) => {
  return await prisma.manager.delete({
    where: { id },
  });
};
