import express, { Request, Response } from 'express';
import { Pool } from "pg";
import config from './config';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req :Request, res:Response) =>{
    res.send("Hello World");

})

const pool = new Pool({
    connectionString : `${config.connection_str}`
})

const initDB = async() =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL
        )
        `)

        console.log("connected")
}

initDB()

app.post('/users', async (req :Request, res:Response) =>{
    const {name, email, password, phone} = req.body;


    try {
        const result = await pool.query(`
          INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *  
            `, [name, email, password, phone])
            console.log(result.rows[0])
            res.status(200).json({
                success: true, 
                message: "User Create Successfully",
                data: result.rows[0]
            })
        
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message
        })      
    }


})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})