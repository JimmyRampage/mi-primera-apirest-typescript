import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { validate } from '../middlewares/validateResource';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';
// import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', postController.getPosts);
router.post('/', validate(createPostSchema), postController.createNewPost);
router.get('/:id', postController.getPost);
router.put('/:id', validate(updatePostSchema), postController.updateExistingPost);
router.delete('/:id', postController.deleteExistingPost);

export default router;