import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "./types/typeJWTPayload";

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = { id: decoded.id, email: decoded.email}
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).json({ message: "Not valid or expired token" })
  }
};