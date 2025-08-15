import { title } from 'process';
import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string({ error: 'Titulo Obligatorio' })
      .min(3, { message: 'Titulo mínimo 3 caracteres' })
      .max(256, { message: 'Título de máximo 256 caracteres' }),
    content: z.string().optional(),
    // authorId: z.number().int().positive(), // Lo quito del schema para que lo obtenga del usuario autenticado
    published: z.boolean().default(false)
  })
});

export const updatePostSchema = z.object({
  params: z.object({
    id: z.string()
      .refine(val => !isNaN(parseInt(val, 10)), { message: 'Debe ser número' })
  }),
  body: z.object({
    title: z.string()
      .min(3)
      .max(256, { message: 'Título de máximo 256 caracteres' })
      .optional(),
    content: z.string()
      .optional(),
    published: z.boolean()
      .optional()
  })
    .refine(data => Object.keys(data).length > 0, {
      message: 'Mínimo un campo para actualizar'
    })
});