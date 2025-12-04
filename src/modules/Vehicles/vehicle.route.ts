import { Router } from "express";
import { vehicleController } from "./vehicle.controller";


const router = Router();

router.post('/', vehicleController.createVehicle)
router.get('/', vehicleController.getVehicles)
router.get('/:vehicleId', vehicleController.getVehiclesById)
router.put('/:vehicleId', vehicleController.updateVehicle)
router.delete('/:vehicleId', vehicleController.deleteVehicle)

export const vehicleRoutes = router