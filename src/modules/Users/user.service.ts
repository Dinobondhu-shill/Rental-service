import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const getUser = async () => {
  const result = await pool.query(`
        SELECT id, name, email, phone, role FROM users
        `);
  return result;
};

const updateUser = async (
  id: string,
  user: JwtPayload,
  payload: Record<string, unknown>
) => {
  const { name, email, phone, role } = payload;

  const emailLower = email ? (email as string).toLowerCase() : null;

  if (user.role !== "admin" && user.id !== id) {

    throw new Error("Unauthorized to update other user's profile");

  } else if (user.role !== "admin" && role && role !== user.role) {

    throw new Error("Unauthorized to change role");

  } else if (user.role !== "admin") {
    
    const updateOwnProfile = await pool.query(
      `
        UPDATE users SET 
          name  = COALESCE($1, name),
          email = COALESCE($2, email),
          phone = COALESCE($3, phone)
        WHERE id = $4 
        RETURNING id, name, email, phone, role;
      `,
      [name, emailLower, phone, user.id]
    );

    return updateOwnProfile.rows[0];
  }

  const result = await pool.query(
    `
      UPDATE users SET 
        name  = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        role  = COALESCE($4, role)
      WHERE id = $5 
      RETURNING id, name, email, phone, role;
    `,
    [name, emailLower, phone, role, id]
  );

  return result.rows[0];
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return result;
};

export const userService = {
  getUser,
  updateUser,
  deleteUser,
};
