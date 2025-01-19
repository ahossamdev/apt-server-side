import { CLIENT_RENEG_LIMIT } from "tls";
import Apartment, { IApartment } from "../models/apartment.model";
interface ISearchQuery {
  name?: string;
  unitNumber?: number;
  project?: string;
  page?: number;
  limit?: number;
  skip?: number;
  sort?: string;
}

export const fetchAllApartments = async (searchQuery?: ISearchQuery) => {
  let query = {};
  const page = searchQuery?.page || 1;
  const limit = searchQuery?.limit ?? 9;
  const skip = searchQuery?.skip ?? 9;
  const sort = searchQuery?.sort ?? "asc";

  if (searchQuery) {
    const { name, unitNumber, project } = searchQuery;
    if (name) {
      query = { ...query, name: { $regex: name, $options: "i" } };
    }
    if (unitNumber) {
      query = { ...query, unitNumber: unitNumber };
    }
    if (project) {
      query = { ...query, project: { $regex: project, $options: "i" } };
    }
  }

  const totalCount = await Apartment.countDocuments(query);
  const apartments = await Apartment.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ name: sort === "asc" ? 1 : -1 });

  return {
    apartments,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export const fetchApartmentDetails = async (id: string) => {
  const apartment = await Apartment.findOne({ _id: id });
  return apartment;
};

export const insertApartment = async (apartment: IApartment) => {
  const newApartment = await Apartment.create(apartment);
  const savingApartement = await newApartment.save();
  return savingApartement;
};
