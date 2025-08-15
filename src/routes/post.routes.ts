import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { validate } from '../middlewares/validateResource';
// import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', postController.getPosts);
router.post('/', postController.createNewPost);
router.get('/:id', postController.getPost);
router.put('/:id', postController.updateExistingPost);
router.delete('/:id', postController.deleteExistingPost);

export default router;