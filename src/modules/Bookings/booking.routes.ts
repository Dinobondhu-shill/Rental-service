import { Router } from "express";
import { bookingController } from "./booking.controller";
import { verifyToken } from "../../middleware/auth.middleware";
// import { verifyToken } from "../../middleware/auth.middleware";

const admin = 'admin';
const router = Router()

router.post('/',verifyToken(admin), bookingController.createBooking);
router.get('/', bookingController.getBookings)

export const bookingRoutes = router;