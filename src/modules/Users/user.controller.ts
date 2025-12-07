import { Request, Response } from "express";
import { userService } from "./user.service";


const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}; //all ok without adding middleware 

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const result = await userService.updateUser(id!, req.body);


    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}; // all ok without adding middleware

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const result = await userService.deleteUser(id!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}; 

export const userController = {
  getUser,
  updateUser,
  deleteUser,
};
