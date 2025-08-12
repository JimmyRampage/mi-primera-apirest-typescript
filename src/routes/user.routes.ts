import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validateResource';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', validate(createUserSchema), userController.createNewUser); // se envia un json
router.get('/:id', userController.getUser);
router.put('/:id', validate(updateUserSchema), userController.updateExistingUser); // se envia un json
router.delete('/:id', userController.deleteExistingUser); // se envia un id

export default router;