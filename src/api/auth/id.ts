import express from "express";
import { body } from "express-validator";
import { User } from "../../model/sequelize.js";
import { validate } from "../validator.js";

export const id = express.Router();

id.post("/", body("id").isString(), validate, async (req, res) => {
  const id: string = req.body.id;

  const validationResult = User.validateId(id);
  const valid = validationResult === null;
  const message = validationResult || [];
  const exists = valid && (await User.findUserById(id)) !== null;

  res.status(200).json({
    validation: {
      valid,
      message,
    },
    exists,
  });
});
