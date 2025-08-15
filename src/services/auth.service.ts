import bcrypt from '../../node_modules/bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { User } from '@prisma/client';

// Usaremos esta interface para evitar exponer el hash de la contraseña
type SafeUser = Omit<User, 'password'>;
type LoginResponse = {
  user: SafeUser;
  token: string
}

export const registerUser = async (userData: Omit<User, 'id'>): Promise<SafeUser> => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      throw new AppError(409, 'Correo electronico ya esta en uso.');
    }
    throw new AppError(500, 'No se puede registrar al usuario.');
  }
};

export const loginUser = async (credentials: Pick<User, 'email' | 'password'>): Promise<LoginResponse> => {
  const { email, password } = credentials;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(401, 'Credenciales inválidas.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, 'Credenciales inválidas.');
  }

  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET no esta definido. La aplicación no es segura.');
    throw new AppError(500, 'Error interno del servidor');
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1d' });

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
}