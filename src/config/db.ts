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

        await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(300) NOT NULL,
            type TEXT,
            registration_number VARCHAR(200) UNIQUE NOT NULL,
            daily_rent_price INT,
            availability_status TEXT
            )`)

        console.log("connected")
}

export default initDB;