import { Request, Response } from 'express';
import UserInstance from '../model/user';

import { v4 as uuidv4} from 'uuid'
import { where } from 'sequelize';

class UserController {
    async create(req:Request, res:Response){
        const id = uuidv4();
        try {
            const user = await UserInstance.create({...req.body, id});
            return res.json({user, mgs: 'User succesfully created'});
        } catch (error) {
            return res.json({msg: 'Fail to crete user', route: '/user/create'});
        }
    }

    async read(req:Request, res:Response) {
        try {
            const users = await UserInstance.findAll({where: {}});
            return res.json({users});
        } catch (error) {
            return res.json({msg: 'Fail to crete user', route: '/user/read'});
        }
    }

    async readById(req:Request, res:Response) {
        try {
            const { id } = req.params;
            const user = await UserInstance.findOne({where:{ id }});
            if(!user) {
                return res.status(404).json({msg: 'User record is not found'})
            }
            return res.status(200).json({user});
        } catch (error) {
            return res.json({msg: 'Fail to fetch user', route: '/user/read/:id'});
        }
    }

    async update(req:Request, res:Response) {
        try {
            const { id } = req.params;
            const user = await UserInstance.findOne({where: {id}});

            const {name, username} = req.body;
           if(!user) {
                return res.json({msg: 'User record is not found'})
           }

           const updatedUser = await user.update({name: name, username: username});

           return res.json({updatedUser, msg:'User record has been updated'})
        } catch (error) {
            return res.json({msg: 'Fail to update user', route:'/user/update'})
        }
    }

    async delete(req:Request, res:Response) {
        try {
            const { id } = req.params;
            const user = await UserInstance.findOne({where: {id}});

           if(!user) {
                return res.json({msg: 'User record is not found'})
           }

           const deletedUser = await user.destroy();

           return res.json({deletedUser, msg:'User record has been deleted'})
        } catch (error) {
            return res.json({msg: 'Fail to update user', route:'/user/delete'})
        }
    }
}

export default new UserController;