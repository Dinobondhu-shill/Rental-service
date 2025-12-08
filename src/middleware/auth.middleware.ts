import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
  return async (req: Request, res: Response, next: Function) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, config.jwt_secret as string);
      console.log({ decoded });

      req.user = decoded as JwtPayload;

      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: error.message,
      });
    }
  };
};

export const verifyToken = auth;
