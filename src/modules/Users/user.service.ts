import { pool } from "../../config/db";


const createUser = async(payload : Record<string, unknown>) =>{

    const {name, email, password, phone} = payload;
     const result = await pool.query(`
          INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *  
            `, [name, email, password, phone]);
            return result;
}

const getUser = async () =>{
    const result = await pool.query(`
        SELECT * FROM users
        `)
        return result;
}

const deleteUser = async(id : string) =>{
   const result =  await pool.query(`DELETE FROM users WHERE id = $1`, [id]); 

   return result ;
}


export const userService = {
    createUser,
    getUser,
    deleteUser
}