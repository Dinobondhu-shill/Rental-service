import bcrypt from "bcrypt";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken"
import config from "../../config";

const createUser = async (payload: Record<string, unknown>) => {

    const {name, phone} = payload;
  const email = (payload.email as string)?.toLowerCase();
  const password = (payload.password as string);
 
  if(password.length < 6){
     throw new Error("Password should be at least 6 character")
  }


  const hashedPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
      `
      INSERT INTO users(name, email, password, phone)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, hashedPassword, phone]
    );

    return result; 
  } 

  const signInUser = async(email: string, password: string) => {
    const lowerCasedEmail = email.toLowerCase();
    const result = await pool.query(`
      SELECT * FROM users WHERE email = $1
      `, [lowerCasedEmail])

      if(result.rowCount === 0){
        throw new Error ("Email doesn't exists")
      }

      const user = result.rows[0]

      const isMatch = await bcrypt.compare(password, result.rows[0]?.password)
      if(!isMatch){
         throw new Error ("Invalid Password")
      }
      
      const token = jwt.sign({name: user.name, email: user.email, role:user.role}, config.jwt_secret!, {expiresIn: "7d"})
    
        return {token,user}
  }


  

export const authService = {
  createUser,
  signInUser
};
