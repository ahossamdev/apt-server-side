import express from 'express';
import { getAllApartments, getApartementDetails, createApartment } from '../controllers/apartment.controller';
import { validateApartmentDetails, validateImage } from '../middlewares/apartments.middleware';
import { validateApartmentCreation } from '../middlewares/apartments.middleware';
import { uploadMiddleware } from '../middlewares/uploadFile.middleware';
const router = express.Router();


router.get('/', getAllApartments);
router.get('/:id', validateApartmentDetails, getApartementDetails);
router.post('/', uploadMiddleware, validateApartmentCreation, createApartment);

export default router; 