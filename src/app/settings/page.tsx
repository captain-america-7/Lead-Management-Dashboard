'use client';

import React from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Database } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-secondary">Manage your account and application preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="card glass divide-y divide-border !p-0">
                    <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Profile Information</p>
                                <p className="text-secondary text-sm">Update your name and email address</p>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-semibold">Edit</button>
                    </div>

                    <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                                <Lock size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Security & Password</p>
                                <p className="text-secondary text-sm">Change your password and enable 2FA</p>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-semibold">Edit</button>
                    </div>

                    <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500">
                                <Bell size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Email Notifications</p>
                                <p className="text-secondary text-sm">Configure how you receive updates</p>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-semibold">Edit</button>
                    </div>

                    <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500">
                                <Database size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Database Management</p>
                                <p className="text-secondary text-sm">Connected to MongoDB Atlas (Production)</p>
                            </div>
                        </div>
                        <span className="text-green-500 text-sm font-medium px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
