import { Router } from 'express';
import * as userController from '../controllers/userController';


const router = Router();

router.get('/load', userController.loadUsers);
router.delete('/users', userController.deleteAllUsers);
router.delete('/users/:userId', userController.deleteUser);
router.get('/users/:userId', userController.getUser);
router.put('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
// Add this before your other user routes


export default router;
