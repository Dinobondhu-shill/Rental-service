import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const admin = 'admin';
const router = Router();

router.post('/', verifyToken(admin), vehicleController.createVehicle)
router.get('/', vehicleController.getVehicles)
router.get('/:vehicleId', vehicleController.getVehiclesById)
router.put('/:vehicleId',verifyToken(admin), vehicleController.updateVehicle)
router.delete('/:vehicleId',verifyToken(admin), vehicleController.deleteVehicle)

export const vehicleRoutes = router