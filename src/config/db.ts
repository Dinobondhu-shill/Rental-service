import { Pool } from "pg";
import config from ".";


export const pool = new Pool({
  connectionString: config.connection_str,
});

const initDB = async () => {
  // USERS TABLE
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      email VARCHAR(250) UNIQUE NOT NULL,
      password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
      phone TEXT UNIQUE NOT NULL,
      role VARCHAR(100) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')) 
    );
  `);

  // VEHICLES TABLE
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(300) NOT NULL,
      type VARCHAR(100) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      registration_number VARCHAR(200) UNIQUE NOT NULL,
      daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(100) NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'booked')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // BOOKINGS TABLE
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      customer_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
      total_price NUMERIC(10,2) CHECK (total_price > 0),
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("connected");
};

export default initDB;
