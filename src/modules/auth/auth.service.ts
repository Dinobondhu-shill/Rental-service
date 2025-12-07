import bcrypt from "bcrypt";
import { pool } from "../../config/db";

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
  

export const authService = {
  createUser,
};
