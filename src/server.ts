import express, { Request, Response } from 'express';
import initDB, { pool } from './config/db';
import { userRoutes } from './modules/Users/user.routes';
import config from './config';


const app = express();
app.use(express.json());

app.get('/', (req :Request, res:Response) =>{
    res.send("Hello World");

})

initDB()

app.use('/api/v1/users', userRoutes)

app.listen(config.port, ()=>{
    console.log(`Server is running on ${config.port}`)
})