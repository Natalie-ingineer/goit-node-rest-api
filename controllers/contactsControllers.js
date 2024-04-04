// import {
// addContact,
// getContactById,
// listContacts,
// removeContact,
// updateContactById,
// } from "../services/contactsServices.js";

// import HttpError from "../helpers/HttpError.js";

import { Contact } from "../db/contact.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
});
// export const getOneContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await getContactById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await removeContact(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// export const createContact = async (req, res, next) => {
//   try {
//     const result = await addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
// export const updateContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await updateContactById(id, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     if (Object.keys(req.body).length === 0) {
//       res.status(400).json({ message: "Body must have at least one field" });
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
