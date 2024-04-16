import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../../controllers/contactsControllers.js";

import validateBody from "../../helpers/validateBody.js";

import { schemasJoi } from "../../models/contact.js";
import { isValidid } from "../../middlewares/isValidid.js";
import { authenticate } from "../../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidid, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidid, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemasJoi.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidid,
  validateBody(schemasJoi.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidid,
  validateBody(schemasJoi.updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
