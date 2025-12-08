import { Request, Response } from "express";
import { authService } from "./auth.service";


const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result, 
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signInUser = async (req: Request, res: Response) => {
  const {email, password} = req.body
    try {
      const result = await authService.signInUser(email, password)
      

      res.status(200).json({
        success: true,
        message : "Login successful",
        data : result
      })

    } catch (error : any) {
      res.status(404).json({
        success: false,
        message : error.message,
        error : error
      })
    }
}

export const authController = {
  createUser,
  signInUser,
};