'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Mail,
    Phone,
    User,
    Calendar,
    MapPin,
    ExternalLink,
    ShieldCheck,
    Clock
} from 'lucide-react';

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    source: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
}

export default function LeadDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/leads/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    router.push('/leads');
                } else {
                    setLead(data);
                }
                setLoading(false);
            });
    }, [id, router]);

    if (loading) return <div className="text-secondary text-center py-20">Loading lead details...</div>;
    if (!lead) return null;

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
        <div className="max-w-4xl mx-auto space-y-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-secondary hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to list
            </button>

            {/* Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-3xl font-bold border border-primary/20">
                        {lead.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{lead.name}</h1>
                        <div className="flex items-center gap-4 text-secondary">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lead.status)}`}>
                                {lead.status}
                            </span>
                            <span className="flex items-center gap-1.5 line-clamp-1">
                                <ShieldCheck size={16} />
                                Assigned to {lead.assignedTo}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info Card */}
                <div className="card glass space-y-6">
                    <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Email Address</p>
                                <p className="text-white font-medium">{lead.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Phone Number</p>
                                <p className="text-white font-medium">{lead.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lead Details Card */}
                <div className="card glass space-y-6">
                    <h3 className="text-xl font-semibold text-white">Lead Attribution</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                                <ExternalLink size={20} />
                            </div>
                            <div>
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Acquisition Source</p>
                                <p className="text-white font-medium">{lead.source}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Created On</p>
                                <p className="text-white font-medium">{new Date(lead.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline/Meta Card - Full Width */}
                <div className="card glass md:col-span-2 flex flex-col md:flex-row justify-between gap-6 items-center">
                    <div className="flex items-center gap-3 text-secondary text-sm">
                        <Clock size={16} />
                        Last updated {new Date(lead.updatedAt).toLocaleString()}
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-primary rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">
                            Mark as Qualified
                        </button>
                        <button className="px-6 py-2 border border-border rounded-lg text-white font-semibold hover:bg-white/5 transition-all">
                            Reassign Lead
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
