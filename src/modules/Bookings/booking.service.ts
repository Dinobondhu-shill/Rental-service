import { pool } from "../../config/db";
import { vehiclesService } from "../Vehicles/vehicle.service";

const role = 'admin'

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

  if (getVehicleData.rows[0].availability_status !== "available") {
  throw new Error("Vehicle is already booked, please choose another vehicle!");
}

  const { daily_rent_price, vehicle_name }  = getVehicleData.rows[0];
  const vehicle = {
    daily_rent_price, vehicle_name
  }

  const total_price = diffDays * daily_rent_price;

  const result = await pool.query(
    `
        INSERT INTO bookings(
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2,$3, $4, $5, $6) RETURNING *
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, 'active']
  );

    if(result.rowCount !==0){
      const updateVehicle = await vehiclesService.updateVehicle(vehicle_id, {availability_status : 'booked'})
    }
    const bookingData = {...result.rows[0], vehicle}
  return bookingData;
};

const getBookings = async () => {

  if(role === 'admin'){
     const bookingData = await pool.query(`
       SELECT id, name, email FROM users JOIN bookings ON users.id = bookings.customer_id;
        `);
        return bookingData
  }

 
  // const customerData = await pool.query(`
  //  SELECT name, email FROM users WHERE id = $1 
  //   `, [])

  return null;
};

export const bookingService = {
  createBooking,
  getBookings,
};
