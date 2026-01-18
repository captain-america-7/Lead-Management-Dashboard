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
    growthRate: string;
    statusBreakdown: { status: string; count: number }[];
    sourceBreakdown: { source: string; count: number }[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

export default function Dashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        fetch('/api/analytics')
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`API Error ${res.status}: ${text}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch analytics:', err);
                setError(err.message);
                setData(null);
                setLoading(false);
            });
    }, []);

    if (!mounted || loading) return <div className="text-slate-200 p-8">Loading dashboard...</div>;
    if (error) return <div className="text-rose-500 p-8">Failed to load analytics: {error}</div>;
    if (!data) return <div className="text-slate-200 p-8">No data available.</div>;

    const stats = [
        { name: 'Total Leads', value: data.totalLeads, icon: Users, color: '#6366f1' },
        { name: 'Conversion Rate', value: `${data.conversionRate}%`, icon: TrendingUp, color: '#10b981' },
        { name: 'Monthly Growth', value: `${data.growthRate}%`, icon: PieChartIcon, color: '#f59e0b' },
        { name: 'Top Source', value: data.sourceBreakdown[0]?.source || 'N/A', icon: UserCheck, color: '#8b5cf6' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-2">Workspace Overview</h1>
                <p className="text-slate-400">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="card glass flex items-center gap-6 border-slate-800">
                        <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-slate-50 mt-1 tabular-nums">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status Breakdown Chart */}
                <div className="card glass border-slate-800">
                    <h3 className="text-xl font-semibold text-slate-50 mb-6">Leads by Status</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.statusBreakdown}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="status" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Source Distribution Pie */}
                <div className="card glass border-slate-800">
                    <h3 className="text-xl font-semibold text-slate-50 mb-6">Top Lead Sources</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.sourceBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="count"
                                    nameKey="source"
                                    stroke="none"
                                >
                                    {data.sourceBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
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
