import mongoose from 'mongoose';


export const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/apartment-app';
        await mongoose.connect(uri,
            {
                serverSelectionTimeoutMS: 5000,
            }
        );
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default connectToDatabase;