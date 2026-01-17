'use client';

import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

interface AnalyticsData {
    totalLeads: number;
    conversionRate: string;
    statusBreakdown: { status: string; count: number }[];
    sourceBreakdown: { source: string; count: number }[];
}

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function AnalyticsPage() {
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

    if (loading) return <div className="text-secondary text-center py-20">Loading detailed analytics...</div>;
    if (!data) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Detailed Analytics</h1>
                <p className="text-secondary">Deep dive into your lead performance and acquisition channels.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Conversion Funnel (Status) */}
                <div className="card glass">
                    <h3 className="text-xl font-semibold text-white mb-6">Lead Progression Funnel</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.statusBreakdown} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" />
                                <YAxis dataKey="status" type="category" stroke="#94a3b8" width={100} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Channel Efficiency (Source) */}
                <div className="card glass">
                    <h3 className="text-xl font-semibold text-white mb-6">Acquisition Channels Distribution</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.sourceBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={140}
                                    paddingAngle={8}
                                    dataKey="count"
                                    nameKey="source"
                                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
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

                {/* Performance Summary */}
                <div className="card glass lg:col-span-2">
                    <h3 className="text-xl font-semibold text-white mb-2">Key Performance Indicators</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-secondary text-sm font-medium">Total Volume</p>
                            <h4 className="text-3xl font-bold text-white mt-1">{data.totalLeads}</h4>
                            <p className="text-xs text-green-400 mt-2">+12% from last month</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-secondary text-sm font-medium">Effective Conversion</p>
                            <h4 className="text-3xl font-bold text-white mt-1">{data.conversionRate}%</h4>
                            <p className="text-xs text-green-400 mt-2">+2.5% improvement</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-secondary text-sm font-medium">Top Performer</p>
                            <h4 className="text-3xl font-bold text-white mt-1">{data.sourceBreakdown[0]?.source || 'N/A'}</h4>
                            <p className="text-xs text-blue-400 mt-2">Highest lead quality</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
