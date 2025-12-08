import { pool } from "../../config/db";


const createVehicle = async (payload : Record<string, unknown>) =>{

    const {vehicle_name, type, registration_number, daily_rent_price} = payload;

    const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1,$2,$3,$4, $5) RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, 'available']);
        return result;

}

const getVehicles = async() =>{
    const result = await pool.query(`
       SELECT * FROM vehicles  
        `)
        return result ;
}

const getVehiclesById = async(id:string) =>{
    const result = await pool.query(`
       SELECT * FROM vehicles WHERE id = ($1) 
        `, [id])
        return result
}

const updateVehicle = async (id: string, payload: any) =>{
    console.log(payload)
     const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

     const result = await pool.query(`
        UPDATE vehicles SET 
        vehicle_name= COALESCE($1, vehicle_name),
        type= COALESCE($2, type),
        registration_number= COALESCE($3, registration_number),
        daily_rent_price = COALESCE($4, daily_rent_price),
        availability_status= COALESCE($5, availability_status) WHERE id = $6 RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id])
        return result
}

const deleteVehicle = async(id : string) =>{


   const statusCheck =  await pool.query(`SELECT availability_status FROM vehicles WHERE id = $1`, [id]);
   console.log(statusCheck) 
    if(statusCheck.rows[0].availability_status === 'booked'){
        throw new Error("Cannot delete a booked vehicle");
    }   
   const result =  await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]); 

   return result ;
}

export const vehiclesService = {
    createVehicle, 
    getVehicles,
    getVehiclesById,
    updateVehicle,
    deleteVehicle
}