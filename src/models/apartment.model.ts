import mongoose, { Schema, Document } from 'mongoose';

export interface IApartment extends Document {
    name: string;
    unitNumber: number;
    area: number;
    project: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    city: string;
    image: string;
    createdAt: Date;
}

const apartmentSchema = new Schema({
    name: { type: String, description: 'The title of the apartment', required: true },
    unitNumber: { type: Number, description: 'The unit number of the apartment', required: true },
    area: { type: Number, description: 'The area of the apartment', required: true },
    project: { type: String, description: 'The project of the apartment', required: true },
    description: { type: String, description: 'The description of the apartment', required: true },
    price: { type: Number, description: 'The price of the apartment', required: true },
    city: { type: String, description: 'The city of the apartment', required: true },
    image: { type: String, description: 'The image of the apartment', required: true },
    bedrooms: { type: Number, description: 'The number of bedrooms in the apartment', required: true },
    bathrooms: { type: Number, description: 'The number of bathrooms in the apartment', required: true },
    createdAt: { type: Date, description: 'The date the apartment was created', timestamps: true, default: Date.now }
    });

export default mongoose.model<IApartment>('Apartment', apartmentSchema); 