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

const getVehiclesById = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehiclesById(req.params.vehicleId!) ;
    console.log(result)

    if(result.rowCount === 0){
        return res.status(200).json({
            success: true,
            message: "No Data found",
            data: result.rows
        })
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVehicle =  async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.updateVehicle(req.params.vehicleId!, req.body);

    if(result.rowCount === 0){
        return res.status(404).json({
            success: false,
            message: "No Data found to update",
            data: result.rows
        })
    }
    res.status(200).json({
      success: true,
      message: "Vehicle update successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.vehicleId;

    const result = await vehiclesService.deleteVehicle(id!);

    // If user not found
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Deleted successfully
    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicles,
  getVehiclesById, 
  updateVehicle, 
  deleteVehicle 
};