import { Request, Response } from "express";
import { vehiclesService } from "./vehicle.service";


const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicle(req.body) ;
    res.status(200).json({
      success: true,
      message: "Vehicles Created Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicles() ;

    if(result.rowCount === 0) {
        return res.status(200).json({
            success: true,
            message: "No vehicles found",
            data : result.rows
        })
    }
    res.status(200).json({
      success: true,
      message: "Vehicles data fetched",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


export const vehicleController = {
  createVehicle,
  getVehicles
};