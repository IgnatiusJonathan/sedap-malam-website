'use client';

import axios from "axios";
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';
import { register } from "module";

function Register() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [noTelp, setNoTelp] = useState<string>('');

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/register', { email, password, noTelp});
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                setNoTelp('');
                router.push('/dashboard');
            } else {
                setEmail('');
                setPassword('');
                setNoTelp('');
                alert('Register failed. Please check your credentials and try again.');
            }
        } catch (error) {
            setEmail('');
            setPassword('');
            setNoTelp('');
            alert('An error occurred during Register. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            <header className="header">
                <div className="header-left">
                    <h1><span className="brand">TARUMART</span> <span className="tagline">Kasir</span></h1>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-4">
                <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Employee Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-xs font-bold uppercase text-gray-500">Employee ID</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="text-xs font-bold uppercase text-gray-500">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="No Telp" className="text-xs font-bold uppercase text-gray-500">No Telp</label>
                            <input
                                type="No Telp"
                                id="No Telp"
                                name="No Telp"
                                className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--maroon)] text-white font-bold py-3 rounded-lg hover:bg-[var(--hover)] transition-opacity mt-4 shadow-md"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Register;