import express, { Request, Response } from 'express';
import initDB, { pool } from './config/db';
import { userRoutes } from './modules/Users/user.routes';
import config from './config';
import { vehicleRoutes } from './modules/Vehicles/vehicle.route';
import { bookingRoutes } from './modules/Bookings/booking.routes';


const app = express();
app.use(express.json());

app.get('/', (req :Request, res:Response) =>{
    res.send("Hello World");

})

initDB()

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/vehicles', vehicleRoutes)
app.use('/api/v1/bookings', bookingRoutes)

app.listen(config.port, ()=>{
    console.log(`Server is running on ${config.port}`)
})