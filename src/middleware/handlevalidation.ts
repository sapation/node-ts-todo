import { validationResult } from 'express-validator';
import {Request, Response, NextFunction} from 'express'

class Middleware {
    handleValidationError(req: Request, res:Response, next:NextFunction){
        const error= validationResult(req);
        if(!error.isEmpty()){
            return res.json(error.array()[0]);
        }
        next();
    }


    test() {}
}

export default new Middleware;