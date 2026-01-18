import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export const dynamic = 'force-dynamic';

export async function GET() {
    console.log('API /api/analytics: Starting request');
    try {
        await dbConnect();
        console.log('API /api/analytics: DB connected');

        const [totalLeads, statusBreakdown, sourceBreakdown] = await Promise.all([
            Lead.countDocuments(),
            Lead.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } },
                { $project: { status: '$_id', count: 1, _id: 0 } },
            ]),
            Lead.aggregate([
                { $group: { _id: '$source', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 },
                { $project: { source: '$_id', count: 1, _id: 0 } },
            ]),
        ]);
        console.log('API /api/analytics: Data fetched', { totalLeads });

        // Calculate conversion rate (Converted / Total)
        const convertedLeads = statusBreakdown.find((s) => s.status === 'Converted')?.count || 0;
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
