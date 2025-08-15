import prisma from '../utils/prisma';
import { Post } from '@prisma/client';

export const getAllPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany();
}

export const getPostById = async (id: number): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { id },
  });
}

export const createPost = async (title: string, content: string = '', authorId: number, published: boolean = false): Promise<Post> => {
  return prisma.post.create({
    data: {
      title,
      content,
      published,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  });
}

export const updatePost = async (id: number, title?: string, content?: string, published?: boolean): Promise<Post | null> => {
  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published
    }
  })
  return post;
}

export const deletePost = async (id: number): Promise<boolean> => {
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
}