import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validateResource';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';
import { protect } from '../middlewares/auth.middleware'

const router = Router();

router.get('/', userController.getUsers);
router.post('/', protect, validate(createUserSchema), userController.createNewUser); // se envia un json
router.get('/:id', userController.getUser);
router.put('/:id', protect, validate(updateUserSchema), userController.updateExistingUser); // se envia un json
router.delete('/:id', protect, userController.deleteExistingUser); // se envia un id

export default router;