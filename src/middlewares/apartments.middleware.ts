import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const apartmentSchema = {
  create: Joi.object({
    name: Joi.string().required().min(3).max(100),
    unitNumber: Joi.number().required().min(0),
    area: Joi.number().required().min(0),
    project: Joi.string().required().min(3).max(300),
    description: Joi.string().required().min(10).max(5000),
    price: Joi.number().required().min(0),
    bedrooms: Joi.number().required().min(0),
    location: Joi.string().required(),
    bathrooms: Joi.number().required().min(0),
    city: Joi.string().required(),
    image: Joi.string().required(),
  }),

  findById: Joi.object({
    id: Joi.string().required(),
  }),
};

// Apartment validation middleware
export const validateApartmentCreation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = apartmentSchema.create.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
    return;
  }
  next();
};

export const validateApartmentDetails = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = apartmentSchema.findById.validate(req.params);
  if (error) {
    res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// image validation middleware
export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    res.status(400).json({
      status: "error",
      message: "Image file is required",
    });
    return;
  }

  // Validate file type
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    res.status(400).json({
      status: "error",
      message: "Invalid file type. Only JPG, JPEG and PNG files are allowed",
    });
    return;
  }

  // Validate file size (e.g., max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (req.file.size > maxSize) {
    res.status(400).json({
      status: "error",
      message: "File is too large. Maximum size is 5MB",
    });
    return;
  }
  next();
};
