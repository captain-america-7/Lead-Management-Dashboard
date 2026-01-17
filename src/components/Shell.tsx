'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 bg-[#0b1120]">
                {children}
            </main>
        </div>
    );
}
