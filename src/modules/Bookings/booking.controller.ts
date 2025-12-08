import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response)=>{
    
 try {
    const result = await bookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }



}

const getBookings = async (req: Request, res: Response)=>{
    
 try {
    const result = await bookingService.getBookings() ;
    console.log(result)
    if (result?.rowCount === 0) {
      res.status(201).json({
      success: true,
      message: "No bookings found",
    });
}
    res.status(201).json({
      success: true,
      message: "Bookings retrieve successfully",
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }



}

const updateBooking = async (req: Request, res: Response)=>{

  try {

const result = await bookingService.updateBooking(req.params.bookingId as string, {user: req.user, body: req.body})
res.status(200).json({
  success: true,
  message: "Booking update successfully",
  data: result
})
    
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message

    })
  }



}
export const bookingController = {
    createBooking,
    getBookings,
    updateBooking
    
}