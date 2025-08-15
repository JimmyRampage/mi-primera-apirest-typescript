import { NextFunction, Request, Response } from "express";
import * as userService from '../services/user.service'
import { User } from '../models/user.model'
import { AppError } from "../utils/AppError";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let users = await userService.getAllUsers();
    const { name, email, phone } = req.query;
    if (name) {
      users = users.filter(user => user.name.toLowerCase().includes((name as string).toLowerCase()));
    }
    if (email) {
      users = users.filter(user => user.email.toLowerCase() === (email as string).toLowerCase());
    }
    if (phone) {
      users = users.filter(user => user.phone === (phone as string).toLowerCase());
    }
    if (!users) {
      throw new AppError(404, 'No se encontraron usuarios');
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) { // Validamos que el id sea un numero
      throw new AppError(400, 'El ID debe ser un número');
    }
    const user = await userService.getUserById(id);
    if (!user) { // Si no se encuentra el usuario activa el handler
      throw new AppError(404, 'Usuario no encontrado');
    }
    res.status(200).json(user); // lo encuentra exitosamente
  } catch (error) {
    next(error); // Se le pasa el error al middleware (el errorHandler)
  }
};

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, password } = req.body as User;
    if (!name || !email || !password) {
      throw new AppError(400, 'Nombre, Email y Password obligatorio, Teléfono opcional');
    }
    const newUser = await userService.createUser(name, email, password, phone);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export const updateExistingUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError(400, 'El id debe ser número');
    }
    const { name, email, phone } = req.body as User;
    if (!name || !email) {
      throw new AppError(400, 'Nombre y email son requeridos');
    }
    const updatedUser = await userService.updateUser(id, name, email, phone);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      throw new AppError(400, 'Usuario no encontrado');
    }
  } catch (error) {
    next(error)
  }
};

export const deleteExistingUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError(400, 'El id debe ser número');
    }
    const success = await userService.deleteUser(id);
    if (success) {
      res.status(204).send(); // 204 para eliminaciones exitosas
    } else {
      throw new AppError(400, 'Usuario no encontrado');
    }
  } catch (error) {
    next(error)
  }
};