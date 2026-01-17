'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    LogOut,
    PieChart,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Leads', href: '/leads', icon: Users },
        { name: 'Analytics', href: '/analytics', icon: PieChart },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
    };

    return (
        <aside className="glass w-64 h-screen fixed left-0 top-0 flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-white">L</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight">LeadFlow</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-secondary hover:bg-white/5 hover:text-foreground'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-danger/10 hover:text-danger transition-all duration-200 mt-auto"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </button>

            <style jsx>{`
        aside {
          border-right: 1px solid var(--glass-border);
        }
        .text-secondary {
          color: #94a3b8;
        }
        .text-foreground {
          color: #f8fafc;
        }
        .bg-primary {
          background-color: #3b82f6;
        }
        .text-danger {
          color: #ef4444;
        }
        .hover\:bg-danger\/10:hover {
          background-color: rgba(239, 68, 68, 0.1);
        }
        .hover\:text-danger:hover {
          color: #ef4444;
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
