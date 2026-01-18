'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { formatLeadDate } from '@/lib/dateUtils';

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

    const fetchLeads = useCallback(async (searchQuery: string, statusFilter: string, pageNum: number) => {
        setLoading(true);
        const params = new URLSearchParams({
            search: searchQuery,
            status: statusFilter,
            page: pageNum.toString(),
            limit: '10',
        });

        try {
            const res = await fetch(`/api/leads?${params}`);
            const result = await res.json();

            if (res.ok && result.data) {
                setLeads(result.data);
                setPagination(result.pagination);
            } else {
                console.error('API Error:', result.error || 'Unknown error');
                setLeads([]);
                setPagination(null);
            }
        } catch (error) {
            console.error('Failed to fetch leads:', error);
            setLeads([]);
            setPagination(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchLeads(search, status, page);
        }, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [search, status, page, fetchLeads]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Contacted': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'Qualified': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'Converted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Lost': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-2">Leads</h1>
                    <p className="text-slate-400">Manage and track your potential customers.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface/50 p-4 rounded-xl border border-border">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none transition-all"
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
            <div className="card overflow-hidden !p-0 border-slate-800">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-white/5">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            // Skeleton Loading State
                            Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 w-32 bg-zinc-800 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-48 bg-zinc-800 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-6 w-20 bg-zinc-800 rounded-full"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-24 bg-zinc-800 rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-24 bg-zinc-800 rounded"></div></td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            ))
                        ) : leads.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                        <Search size={48} className="mb-4 opacity-20" />
                                        <h3 className="text-lg font-medium text-slate-200">No leads found</h3>
                                        <p className="max-w-xs mx-auto mt-1 text-slate-500">Try adjusting your filters or search terms.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-zinc-800/50 transition-colors group border-b border-border last:border-0">
                                    <td className="px-6 py-4">
                                        <Link href={`/leads/${lead._id}`} className="font-medium text-slate-200 hover:text-indigo-400 transition-colors block">
                                            {lead.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm font-mono">{lead.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">{lead.source}</td>
                                    <td className="px-6 py-4 text-slate-400 text-sm tabular-nums">
                                        {formatLeadDate(lead.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                                            <MoreHorizontal size={16} />
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
                        <span className="text-sm text-slate-400">
                            Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, pagination.total)} of {pagination.total} leads
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="p-2 border border-border rounded-lg text-slate-400 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm font-medium text-slate-200 px-3">
                                Page {page} of {pagination.totalPages}
                            </span>
                            <button
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="p-2 border border-border rounded-lg text-slate-400 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
