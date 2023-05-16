import {DataTypes, Model} from 'sequelize';
import db from '../configs/database.config';

interface UserAttribute {
    id: string,
    name: string,
    username: string,
    password: string
}

class UserInstance extends Model<UserAttribute> {}

UserInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: 'users'
    }
);

export default UserInstance;