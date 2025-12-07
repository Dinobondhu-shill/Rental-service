import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
  }: any = payload;
  const start: any = new Date(rent_start_date);
  const end: any = new Date(rent_end_date);

  const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  const getVehicleData = await pool.query(
    `
        SELECT * FROM vehicles WHERE id = $1
        `,
    [vehicle_id]
  );

  if (getVehicleData.rowCount === 0) {
  throw new Error("Vehicle not found");
}
  if (getVehicleData.rows[0].status !== "available") {
  throw new Error("Vehicle is already booked, please choose another vehicle!");
}

  const { daily_rent_price, vehicle_name } = getVehicleData.rows[0];

  const total_price = diffDays * daily_rent_price;

  const result = await pool.query(
    `
        INSERT INTO bookings(
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2,$3, $4, $5) RETURNING *
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  return { ...result.rows, vehicle: { vehicle_name, daily_rent_price } };
};

const getBookings = async () => {
  const result = await pool.query(`
       SELECT * FROM bookings 
        `);

  return result;
};

export const bookingService = {
  createBooking,
  getBookings,
};
