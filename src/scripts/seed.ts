import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-dashboard';

const LeadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        status: {
            type: String,
            enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
            default: 'New',
        },
        source: { type: String, required: true },
        assignedTo: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
const sources = ['Website', 'Facebook Ads', 'Google Search', 'LinkedIn', 'Referral', 'Email Campaign'];
const agents = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        console.log('Clearing existing leads...');
        await Lead.deleteMany({});
        console.log('Cleared.');

        const numLeads = 500;
        const leads = [];

        console.log(`Generating ${numLeads} leads...`);

        for (let i = 0; i < numLeads; i++) {
            leads.push({
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                phone: faker.phone.number(),
                status: faker.helpers.arrayElement(statuses),
                source: faker.helpers.arrayElement(sources),
                assignedTo: faker.helpers.arrayElement(agents),
                createdAt: faker.date.past({ years: 1 }),
            });
        }

        await Lead.insertMany(leads);
        console.log(`Successfully seeded ${numLeads} leads.`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
