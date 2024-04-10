import HttpError from "../helpers/HttpError.js";

import { Contact } from "../models/contact.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.json(result);
};

export const createContact = catchAsync(async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
  }
  res.status(200).json(result);
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
  }
  res.status(200).json(result);
});
