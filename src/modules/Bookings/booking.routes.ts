import { Router } from "express";
import { bookingController } from "./booking.controller";
import { verifyToken } from "../../middleware/auth.middleware";
// import { verifyToken } from "../../middleware/auth.middleware";

const admin = 'admin';
const customer = 'customer'
const router = Router()

router.post('/',verifyToken(admin, customer), bookingController.createBooking);
router.get('/',verifyToken(admin, customer), bookingController.getBookings)
router.put('/:bookingId' ,verifyToken(admin, customer), bookingController.updateBooking)

export const bookingRoutes = router;