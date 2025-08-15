import { z } from 'zod';

// Este objeto zod permite validar la creacion de un usuario
export const createUserSchema = z.object({
  body: z.object({
    name: z.string({error: 'Nombre obligatorio'})
      .min(3, {message: 'Nombre de mínimo 3 caracteres'}),
    email: z.email({error: 'Email obligatorio'}),
    phone: z.string()
      .regex(/^\+\d{7,15}$/, {message: 'Numero debe empezar con "+" y tener entre 7 a 15 digitos'})
      .optional()
  })
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string()
      .refine(val => !isNaN(parseInt(val, 10)), {message: 'Debe ser número'})
  }),
  body: z.object({
    name: z.string()
      .min(3)
      .optional(),
    email: z.email()
      .optional(),
    password: z.string()
      .min(3)
  })
    .partial() // partial convierte automaticamente los parametros en optional
    .refine(data => Object.keys(data).length > 0, {
      message: 'Mínimo un campo para actualizar'
    })
})