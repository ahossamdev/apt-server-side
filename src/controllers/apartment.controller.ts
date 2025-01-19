import { Request, Response } from "express";
import {
  fetchAllApartments,
  fetchApartmentDetails,
  insertApartment,
} from "../services/apartement.service";

export const getAllApartments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, unitNumber, project, page, limit, skip, sort } = req.query;

    const searchQuery = {
      ...(name && { name: String(name) }),
      ...(unitNumber && { unitNumber: Number(unitNumber) }),
      ...(project && { project: String(project) }),
      ...(page && { page: Number(page) }),
      ...(limit && { limit: Number(limit) }),
      ...(skip && { skip: Number(skip) }),
      ...(sort && { sort: String(sort) }),
    };
    const apartments = await fetchAllApartments(searchQuery);
    res.json(apartments);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching apartments" });
  }
};

export const getApartementDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const apartment = await fetchApartmentDetails(req.params.id);
    if (!apartment) {
      res.status(404).json({ error: "Apartment not found" });
    } else {
      res.json(apartment);
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid apartment id" });
  }
};

export const createApartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("req.body.image", req.body.image);
    const apartmentData = {
      ...req.body,
      // image: req.file ? `${req.file.filename}` : null,
    };
    console.log("apartmentData", apartmentData);
    const apartment = await insertApartment(apartmentData);
    res.status(201).json(apartment);
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ message: "Error creating apartment" });
  }
};
