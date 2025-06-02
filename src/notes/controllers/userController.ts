import { User } from "../../types/typeUser";
import { Request, Response } from "express";
import * as UserModel from "../models/userModel";

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID is no found" });
    return;
  }

  const user = await UserModel.getUserById(id);

  if (!user) {
    res.status(404).json({ message: "User is not found" });
    return;
  }
  res.json(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "ID is not correct" });
    return;
  }

  const deletedUser = await UserModel.deleteUser(id);

  if (!deletedUser) {
    res.status(404).json({ message: "User is not found" });
    return;
  }

  res.json({ message: "User is deleted" });
};
