import express from 'express';
import UserController from "../controller/user"
import UserValidator from '../validator/user'
import Middleware  from '../middleware/handlevalidation';

const router = express.Router();

router.post('/create',
    UserValidator.checkCreateUser(),
    Middleware.handleValidationError,
    UserController.create);

router.get('/read', UserController.read);


router.get('/read/:id',
    UserValidator.checkIdParams(),
    Middleware.handleValidationError,
    UserController.readById);

router.put('/update/:id',
    UserValidator.checkIdParams(),
    Middleware.handleValidationError,
    UserController.update);

router.delete('/delete/:id',
    UserValidator.checkIdParams(),
    Middleware.handleValidationError,
    UserController.delete);

export default router;