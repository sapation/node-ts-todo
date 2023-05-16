import {Request, Response} from 'express';
import TodoInstance from "../model/todo"
import { v4 as uuidv4 } from 'uuid';

class TodoController {

    async create(req: Request, res:Response) {
        const id = uuidv4();
        try {
            const record = await TodoInstance.create({...req.body, id});
            return res.json({ record, msg: "Successfully create todo"});
        } catch (e) {
            return res.json({msg: 'fail to create', status: 500, route:'/create'})
        }
    }

    async readPagination(req: Request, res:Response) {
        try {
            const limit  = req.query?.limit as number | undefined;
            const offset  = req.query?.offset as number | undefined;

            const record = await TodoInstance.findAll({ where:{}, limit, offset });
            return res.json(record);
        } catch (error) {
            return res.json({msg: 'fail to read', status: 500, route:'/read'})
        }
    }


    async readById(req: Request, res:Response) {
        try {
            const { id } =req.params;

            const record = await TodoInstance.findOne({ where:{id} });
            return res.json({record});

        } catch (error) {
            return res.json({msg: 'fail to read', status: 500, route:'/read/:id'})
        }
    }

    async update(req: Request, res:Response) {
        try {
            const { id } =req.params;

            const record = await TodoInstance.findOne({ where:{id} });

            if(!record) {
                return res.json({msg: `Can not find record with this ${id}`})
            }

            const updatedRecord = await record.update({
                completed: !record.getDataValue('completed')
            });

            return res.json({record: updatedRecord});

        } catch (error) {
            return res.json({msg: 'fail to update', status: 500, route:'/update/:id'})
        }
    }

    async delete(req: Request, res:Response) {
        try {
            const { id } =req.params;

            const record = await TodoInstance.findOne({ where:{id} });

            if(!record) {
                return res.json({msg: `Can not find record with this ${id}`})
            }

            const deletedRecord = await record.destroy();

            return res.json({record: deletedRecord});

        } catch (error) {
            return res.json({msg: 'fail to delete', status: 500, route:'/delete/:id'})
        }
    }

}

export default new TodoController;