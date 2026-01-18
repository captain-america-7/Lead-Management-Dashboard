import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function listCollections() {
    if (!MONGODB_URI) {
        console.error('MONGODB_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        if (!mongoose.connection.db) {
            throw new Error('Database connection failed');
        }

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections detected:', collections.map(c => c.name));

        for (const coll of collections) {
            const count = await mongoose.connection.db.collection(coll.name).countDocuments();
            console.log(`- Collection "${coll.name}": ${count} documents`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error listing collections:', error);
    }
}

listCollections();
