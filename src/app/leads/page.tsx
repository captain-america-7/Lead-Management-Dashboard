'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    createdAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function LeadsList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({
            search,
            status,
            page: page.toString(),
            limit: '10',
        });

        try {
            const res = await fetch(`/api/leads?${params}`);
            const result = await res.json();
            setLeads(result.data);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setLoading(false);
        }
    }, [search, status, page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLeads();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchLeads]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Contacted': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Qualified': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'Converted': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Lost': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Leads</h1>
                    <p className="text-secondary">Manage and track your potential customers.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface/50 p-4 rounded-xl border border-border">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary transition-all"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                        <select
                            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-primary appearance-none transition-all"
                            value={status}
                            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                        >
                            <option value="">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card glass overflow-hidden !p-0">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-white/5">
                            <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Source</th>
                            <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-secondary">Loading leads...</td>
                            </tr>
                        ) : leads.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-secondary">No leads found.</td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <Link href={`/leads/${lead._id}`} className="font-medium text-white hover:text-primary transition-colors">
                                            {lead.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-secondary">{lead.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-secondary text-sm">{lead.source}</td>
                                    <td className="px-6 py-4 text-secondary text-sm">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-secondary hover:text-white transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="px-6 py-4 flex items-center justify-between border-t border-border bg-white/5">
                        <span className="text-sm text-secondary">
                            Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, pagination.total)} of {pagination.total} leads
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="p-2 border border-border rounded-lg text-secondary hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm font-medium text-white px-3">
                                Page {page} of {pagination.totalPages}
                            </span>
                            <button
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="p-2 border border-border rounded-lg text-secondary hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
