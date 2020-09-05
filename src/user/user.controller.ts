import { Router } from 'express';
import * as UserController from './user.service';

const router = Router();
export default router;

router.post('/user/create', UserController.createAccount);
router.post('/user/login', UserController.loginAccount);
