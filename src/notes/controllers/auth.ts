import { User } from './../../types/typeUser';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserModel from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const existingUser = await UserModel.findUserByEmail(email);

  if(existingUser) {
    res.status(400).json({ message: "User with such email is already exist" });
    return;
  };

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = await UserModel.createUser(email, hashedPassword);
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET! )

  res.status(201).json({ newUser, token });
}