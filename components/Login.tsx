'use client';

import { useEffect, useState } from 'react';
import { account, ID } from '../lib/appwrite';
import Loading from '../components/Loading';
import AuthForm from '../components/AuthForm';
import UserDashboard from '../components/UserDashboard';
import { Models } from 'appwrite';

export default function Login() {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
        null
    );
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        }
        getUser();
    }, []);

    async function handleLogin(email: string, password: string) {
        try {
            await account.createEmailPasswordSession(email, password);
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRegister(email: string, password: string) {
        try {
            await account.create(ID.unique(), email, password);
            await handleLogin(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLogout() {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    if (loadingUser) return <Loading />;
    if (user)
        return <UserDashboard email={user.email} handleLogout={handleLogout} />;
    return (
        <AuthForm handleLogin={handleLogin} handleRegister={handleRegister} />
    );
}
