import HttpError from "../helpers/HttpError.js";

import { Contact } from "../models/contact.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

export const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndDelete({ _id: id, owner });

  if (!result) {
    return res.status(404).json({ error: "Contact not found" });
  }

  res.json(result);
};

export const createContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
});

export const updateContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const filter = { _id: id, owner };
  const result = await Contact.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
  }
  res.status(200).json(result);
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const filter = { _id: id, owner };
  const result = await Contact.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
  }
  res.status(200).json(result);
});
