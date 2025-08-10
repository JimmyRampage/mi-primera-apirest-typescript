import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createNewUser); // se envia un json
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateExistingUser); // se envia un json
router.delete('/:id', userController.deleteExistingUser); // se envia un id

export default router;