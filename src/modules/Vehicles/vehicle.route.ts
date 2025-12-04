import { Router } from "express";
import { vehicleController } from "./vehicle.controller";


const router = Router();

router.post('/', vehicleController.createVehicle)
router.get('/', vehicleController.getVehicles)


export const vehicleRoutes = router