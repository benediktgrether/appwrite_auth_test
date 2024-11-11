'use client';

import { useEffect, useState } from 'react';
import { account, ID } from './appwrite';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    console.log(user);

    // useEffect(() => {
    //     async function getUser() {
    //         setUser(account.get());
    //         setLoadingUser(false);
    //     }
    //     getUser();
    // }, []);

    useEffect(() => {
        async function getUser() {
            try {
                const user = await account.get();
                setUser(user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingUser(false);
            }
        }
        getUser();
    }, []);

    async function handleLogout() {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLogin() {
        try {
            await account.createEmailPasswordSession(email, password);
            setUser(account.get());
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRegister() {
        try {
            await account.create(ID.unique(), email, password);
            await handleLogin();
        } catch (error) {
            console.error(error);
        }
    }

    if (loadingUser) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <h1 className="text-2xl font-bold text-center text-black">
                        Loading...
                    </h1>
                </div>
            </main>
        );
    }

    if (user) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <h1 className="text-2xl font-bold text-center text-black">
                        Welcome {user.email}
                    </h1>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Logout
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center text-black">
                    Login or Sign up Page
                </h1>
                <form className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
