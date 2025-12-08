import { Router } from "express";
import { bookingController } from "./booking.controller";
// import { verifyToken } from "../../middleware/auth.middleware";


const router = Router()

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings)

export const bookingRoutes = router;