import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { validate } from '../middlewares/validateResource';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';
import { protect } from '../middlewares/auth.middleware'

const router = Router();

router.get('/', postController.getPosts);
router.post('/', protect, validate(createPostSchema), postController.createNewPost);
router.get('/:id', postController.getPost);
router.put('/:id', protect, validate(updatePostSchema), postController.updateExistingPost);
router.delete('/:id', protect, postController.deleteExistingPost);

export default router;