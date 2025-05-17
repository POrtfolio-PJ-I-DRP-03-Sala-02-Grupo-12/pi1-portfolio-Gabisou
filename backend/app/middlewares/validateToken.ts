import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jsonWebToken";

const validateToken  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }
    
    const isValidToken = (authorization && typeof authorization === 'string')
      ? await verifyToken(authorization)
      : false;


    if (!isValidToken) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    next();  
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });  
  }
  
};

export default validateToken;