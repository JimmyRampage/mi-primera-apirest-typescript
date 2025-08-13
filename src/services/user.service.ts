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

// ---------- Sin bbdd ----------
// import { User } from '../models/user.model';
// let users: User[] = [
//   { id: 1, name: 'James', email: 'james@correo.com', phone: '+123123123' },
//   { id: 2, name: 'Maria', email: 'mara@correo.com', phone: '+321321321' },
//   { id: 3, name: 'Iki', email: 'iki@correo.com' }
// ]

// let nextId = 4;

// export const getAllUsers = (): User[] => {
//   return users;
// }

// export const getUserById = (id: number): User | undefined => {
//   return users.find(user => user.id === id);
// };

// export const createUser = (name: string, email:string, phone?: string) => {
//   const newUser: User = {
//     id: nextId ++,
//     name: name,
//     email: email,
//     phone: phone
//   };
//   users.push(newUser);
//   return newUser;
// };

// export const updateUser = (id: number,name: string, email: string, phone?: string): User | null => {
//   const userIndex = users.findIndex(user => user.id === id); // Encuentra el indice de un user dado su id
//   if (userIndex === -1) {
//     return null;
//   }
//   users[userIndex] = { id, name, email, phone };
//   return users[userIndex];
// };

// export const deleteUser = (id: number): boolean => {
//   const initialLength = users.length;
//   users = users.filter(user => user.id !== id);
//   return users.length < initialLength;
// };