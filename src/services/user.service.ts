// ---------- Con bbdd ----------
import prisma from "../utils/prisma";
import { User } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
}

export const getUserById = async (id: number): Promise<User | null> => { // aun no implementada
  return prisma.user.findUnique({
    where: { id },
  });
}

export const createUser = async (name: string, email: string, phone?:string): Promise<User> => {
  return prisma.user.create({
    data: { name, email, phone },
  });
}

export const updateUser = async (id: number, name: string, email: string, phone?: string): Promise<User | null> => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      phone
    }
  });
  return user;
}

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const user = await prisma.user.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};
