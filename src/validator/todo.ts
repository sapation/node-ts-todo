import { body, query,param } from "express-validator";

class Todovalidator {
    checkCreateTodo() {
        return [
            body('id')
                .optional()
                .isUUID(4).withMessage('The value should be uuid v4'),

            body('title')
                .notEmpty()
                .withMessage('The title value should not be empty'),

            body('completed')
                .optional()
                .isBoolean()
                .withMessage('The value should be boolean')
                .isIn([0, false])
                .withMessage('The value should be 0 or false')
        ]
    }

    checkReadTodo() {
        return [
            query('limit')
                .notEmpty()
                .withMessage('The query limit should not be empty')
                .isInt({min:1, max:10})
                .withMessage('The limit value should be number and between 1-10'),

            query('limit')
                .optional()
                .isNumeric()
                .withMessage('The value should be a value')
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

export default new Todovalidator;

