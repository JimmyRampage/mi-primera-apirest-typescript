import { User } from '../models/user.model';

let users: User[] = [
  { id: 1, name: 'James', email: 'james@correo.com', phone: '+123123123' },
  { id: 2, name: 'Maria', email: 'mara@correo.com', phone: '+321321321' },
  { id: 3, name: 'Iki', email: 'iki@correo.com' }
]

let nextId = 4;

export const getAllUsers = (): User[] => {
  return users;
}

export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

export const createUser = (name: string, email:string, phone?: string) => {
  const newUser: User = {
    id: nextId ++,
    name: name,
    email: email,
    phone: phone
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number,name: string, email: string, phone?: string): User | null => {
  const userIndex = users.findIndex(user => user.id === id); // Encuentra el indice de un user dado su id
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = { id, name, email, phone };
  return users[userIndex];
};

export const deleteUser = (id: number): boolean => {
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  return users.length < initialLength;
};