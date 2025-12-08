import { pool } from "../../config/db";
import { vehiclesService } from "../Vehicles/vehicle.service";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date }: any =
    payload;
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
    throw new Error(
      "Vehicle is already booked, please choose another vehicle!"
    );
  }

  const { daily_rent_price, vehicle_name } = getVehicleData.rows[0];
  const vehicle = {
    daily_rent_price,
    vehicle_name,
  };

  const total_price = diffDays * daily_rent_price;

  const result = await pool.query(
    `
        INSERT INTO bookings(
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2,$3, $4, $5, $6) RETURNING *
        `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );

  if (result.rowCount !== 0) {
    const updateVehicle = await vehiclesService.updateVehicle(vehicle_id, {
      availability_status: "booked",
    });
  }
  const bookingData = { ...result.rows[0], vehicle };
  return bookingData;
};

const getBookings = async (payload: any) => {
  const { role } = payload;

  console.log("payload in booking service", payload);

  if (role === "admin") {
    const bookingData = await pool.query(`
     SELECT 
  b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date,
  b.total_price, b.status,
  json_build_object('name', u.name, 'email', u.email) AS customer,
  json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle
  FROM bookings b
  JOIN users u ON b.customer_id = u.id
  JOIN vehicles v ON b.vehicle_id = v.id
  ORDER BY b.id DESC;
        `);
    return bookingData;
  } else if (role === "customer") {
    const bookingData = await pool.query(
      `SELECT 
      b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date,
      b.total_price, b.status,
      json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1`,
      [payload.id]
    );
    return bookingData;
  }
  throw new Error("You are not authorized to view bookings");
};

const updateBooking = async (id: string, payload: any) => {
  const user = payload.user;
  const { status } = payload.body;

  const bookingData = await pool.query(
    `
    SELECT * FROM bookings WHERE id = $1
    `,
    [id]
  );

  if (bookingData.rowCount === 0) {
    throw new Error("Booking not found");
  }

  const { customer_id, vehicle_id } = bookingData.rows[0];

  switch (user.role) {
    case "customer":
      if (user.id === customer_id) {
        const result = await pool.query(
          `
            UPDATE bookings SET status = $1
      WHERE id = $2
      RETURNING * `,
          [status, id]
        );
        await vehiclesService.updateVehicle(vehicle_id, {
          availability_status: "available",
        });

        if (result.rowCount === 0) {
          throw new Error("Booking not found");
        }
        return result.rows[0];
      } else {
        throw new Error("You are not allowed to edit data");
      }
    case "admin":
      const result = await pool.query(
        `
          UPDATE bookings SET status = $1
    WHERE id = $2
    RETURNING * `,
        [status, id]
      );

      if (result.rowCount === 0) {
        throw new Error("Booking not found");
      } else {
        const vehicleData = await vehiclesService.updateVehicle(vehicle_id, {
          availability_status: "available",
        });

        const { availability_status } = vehicleData.rows[0];

        const vehicle = { availability_status };

        const bookingData = { ...result.rows[0], vehicle };
        return bookingData;
      }
  }
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBooking,
};
