import { NextFunction, Request, Response } from "express";
import * as postService from '../services/post.service'
import { Post } from '../models/post.model'
import { AppError } from "../utils/AppError";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let posts = await postService.getAllPosts();
    // Aca se pueden implementar filtros, por ahora no.
    if (!posts) {
      throw new AppError(404, 'No se encontraron posts');
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError(400, 'El ID debe ser un número');
    }
    const post = await postService.getPostById(id);
    if (!post) {
      throw new AppError(404, 'Post no encontrado');
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, authorId, published } = req.body as Post;
    if (!title || !authorId) {
      throw new AppError(400, 'Titulo y autorId obligatorio');
    }
    const newPost = await postService.createPost(title, content, authorId, published);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
}

export const updateExistingPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError(400, 'El id debe ser númerico');
    }
    const { title, content, published } = req.body as Post;
    // if (!title) {
    //   throw new AppError(400, 'Titulo requerido');
    // }
    const updatedPost = await postService.updatePost(id, title, content, published);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      throw new AppError(400, 'Post no encontrado');
    }
  } catch (error) {
    next(error);
  }
}

export const deleteExistingPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new AppError(400, 'El id debe ser número');
    }
    const success = await postService.deletePost(id);
    if (success) {
      res.status(204).send();
    } else {
      throw new AppError(400, 'Post no encontrado');
    }
  } catch (error) {
    next(error);
  }
}