import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import { schemasJoi } from "../db/contact.js";
import { isValidid } from "../middlewares/isValidid.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidid, getOneContact);

contactsRouter.delete("/:id", isValidid, deleteContact);

contactsRouter.post(
  "/",
  isValidid,
  validateBody(schemasJoi.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  isValidid,
  validateBody(schemasJoi.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidid,
  validateBody(schemasJoi.updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
