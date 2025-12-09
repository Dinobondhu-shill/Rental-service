import { Router } from "express";
import { userController } from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";


const router = Router();
const admin = 'admin';
const customer = 'customer';

router.get('/',verifyToken(admin), userController.getUser)
router.put('/:userId',verifyToken(admin, customer), userController.updateUser) 
router.delete('/:userId', verifyToken(admin), userController.deleteUser)


export const userRoutes = router;