import express from 'express';


import db from './configs/database.config';
import todoRouter from './router/todo';
import userRouter from './router/user'

db.sync().then(()=> {
    console.log('Connecting to db');
})

const app = express();
const port = 9000;

// Middlewares
app.use(express.json());

// Routers
app.use('/api/v1/todo', todoRouter);
app.use('/api/v1/user', userRouter);


app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`)
})