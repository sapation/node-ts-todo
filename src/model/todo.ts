import { DataTypes, Model } from "sequelize";
import db from "../configs/database.config";

interface TodoAttribute {
    id: string,
    title: string,
    completed: boolean
}

class TodoInstance extends Model<TodoAttribute> {};

TodoInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    
    {
        sequelize: db,
        tableName: "todos"
    }
);

export default TodoInstance;