import { User } from "../../types/typeUser";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/userModel";
import { JWTPayload } from "../../types/typeJWTPayload";

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.getUserByEmail(email);

  if (existingUser) {
    res.status(400).json({ message: "User with such email is already exist" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser: User = await UserModel.createUser(email, hashedPassword);
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email } as JWTPayload,
    process.env.JWT_SECRET!
  );

  res.status(201).json({ newUser, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.getUserByEmail(email);

  if (!existingUser) {
    res.status(401).json({ message: "Email or password is not correct" });
    return;
  }

  if (!await bcrypt.compare(password, existingUser.password)) {
    res.status(401).json({ message: "Email or password is not correct" });
    return;
  }

  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email } as JWTPayload,
    process.env.JWT_SECRET!
  );

  res.status(200).json({ token });
};
