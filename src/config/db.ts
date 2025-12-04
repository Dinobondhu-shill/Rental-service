import { Pool } from "pg";
import config from ".";


export const pool = new Pool({
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

export default initDB;