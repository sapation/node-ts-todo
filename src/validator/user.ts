import { body,param } from 'express-validator';

class UserValidator {
    checkCreateUser() {
        return [
            body('name')
                .trim()
                .notEmpty()
                .withMessage('Please fill the name'),

            body('username')
                .trim()
                .notEmpty()
                .withMessage('Please fill in the username'),

            body('password')
                .trim()
                .notEmpty()
                .withMessage('Please fill in the password field')
                .isLength({min: 6})
                .withMessage('The password should be minimum 6 characters')
        ]
    }

    checkIdParams(){
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should not be empty')
                .isUUID(4)
                .withMessage('The value should be uuid v4')
        ]
    }
}

export default new UserValidator;