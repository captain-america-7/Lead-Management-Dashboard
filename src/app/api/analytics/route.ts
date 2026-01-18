import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    console.log('API /api/analytics: Starting request');

    // Debug logging to verify the URI loaded in this context 
    // (Only logging first 25 chars to be safe)
    const uri = process.env.MONGODB_URI || '';
    console.log('API /api/analytics: URI Check ->', uri.substring(0, 25) + (uri.length > 25 ? '...' : ''));

    try {
        const client = await clientPromise;
        // Connect to the default database defined in the connection string
        const db = client.db();

        console.log('API /api/analytics: DB connected via native client');

        const [totalLeads, statusBreakdown, sourceBreakdown] = await Promise.all([
            db.collection('leads').countDocuments(),
            db.collection('leads').aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } },
                { $project: { status: '$_id', count: 1, _id: 0 } },
            ]).toArray(),
            db.collection('leads').aggregate([
                { $group: { _id: '$source', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 },
                { $project: { source: '$_id', count: 1, _id: 0 } },
            ]).toArray(),
        ]);

        console.log('API /api/analytics: Data fetched', { totalLeads });

        // Calculate conversion rate (Converted / Total)
        const convertedLeads = (statusBreakdown.find((s: any) => s.status === 'Converted') as any)?.count || 0;
        const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

        return NextResponse.json({
            totalLeads,
            conversionRate: conversionRate.toFixed(2),
            statusBreakdown,
            sourceBreakdown,
        });
    } catch (error: any) {
        console.error('API /api/analytics: Error occurred', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
