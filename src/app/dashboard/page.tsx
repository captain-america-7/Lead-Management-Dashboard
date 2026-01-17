'use client';

import React, { useEffect, useState } from 'react';
import {
    Users,
    UserCheck,
    TrendingUp,
    PieChart as PieChartIcon
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

interface AnalyticsData {
    totalLeads: number;
    conversionRate: string;
    statusBreakdown: { status: string; count: number }[];
    sourceBreakdown: { source: string; count: number }[];
}

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-white">Loading dashboard...</div>;
    if (!data) return <div className="text-white">Failed to load analytics.</div>;

    const stats = [
        { name: 'Total Leads', value: data.totalLeads, icon: Users, color: '#3b82f6' },
        { name: 'Conversion Rate', value: `${data.conversionRate}%`, icon: TrendingUp, color: '#22c55e' },
        { name: 'Active Statuses', value: data.statusBreakdown.length, icon: PieChartIcon, color: '#f59e0b' },
        { name: 'Top Source', value: data.sourceBreakdown[0]?.source || 'N/A', icon: UserCheck, color: '#8b5cf6' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Workspace Overview</h1>
                <p className="text-secondary">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="card glass flex items-center gap-6">
                        <div
                            className="p-4 rounded-2xl"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-secondary text-sm font-medium">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status Breakdown Chart */}
                <div className="card glass">
                    <h3 className="text-xl font-semibold text-white mb-6">Leads by Status</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.statusBreakdown}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="status" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Source Distribution Pie */}
                <div className="card glass">
                    <h3 className="text-xl font-semibold text-white mb-6">Top Lead Sources</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.sourceBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="count"
                                    nameKey="source"
                                >
                                    {data.sourceBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
