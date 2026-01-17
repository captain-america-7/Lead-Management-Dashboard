'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock authentication
        if (email === 'admin@example.com' && password === 'admin123') {
            document.cookie = 'auth-token=authenticated; path=/; max-age=86400';
            router.push('/');
        } else {
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <h1>Lead Manager</h1>
                    <p>Login to access your dashboard</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="admin123"
                        required
                    />
                </div>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className={styles.demoHint}>
                    Demo: admin@example.com / admin123
                </p>
            </form>
        </div>
    );
}
