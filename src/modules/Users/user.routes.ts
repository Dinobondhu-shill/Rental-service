import { Router } from "express";
import { userController } from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";


const router = Router();

router.get('/',verifyToken(), userController.getUser)
router.put('/:userId', userController.updateUser) 
router.delete('/:userId', userController.deleteUser)


export const userRoutes = router;