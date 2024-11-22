// 'use client';

// import { useEffect, useState } from 'react';
// import { account, ID } from '../lib/appwrite';
// import Loading from '../components/Loading';
// import AuthForm from '../components/AuthForm';
// import UserDashboard from '../components/UserDashboard';
// import { Models } from 'appwrite';

// export default function Login() {
//     const [user, setUser] = useState(null);
//     const [loadingUser, setLoadingUser] = useState(true);

//     useEffect(() => {
//         async function getUser() {
//             try {
//                 const currentUser = await account.get();
//                 setUser(currentUser);
//             } catch {
//                 setUser(null);
//             } finally {
//                 setLoadingUser(false);
//             }
//         }
//         getUser();
//     }, []);

//     async function handleLogin(email: string, password: string) {
//         try {
//             await account.createEmailPasswordSession(email, password);
//             const currentUser = await account.get();
//             setUser(currentUser);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function handleRegister(email: string, password: string) {
//         try {
//             await account.create(ID.unique(), email, password);
//             await handleLogin(email, password);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function handleLogout() {
//         try {
//             await account.deleteSession('current');
//             setUser(null);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     if (loadingUser) return <Loading />;
//     if (user)
//         return <UserDashboard email={user.email} handleLogout={handleLogout} />;
//     return (
//         <AuthForm handleLogin={handleLogin} handleRegister={handleRegister} />
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import { account, ID } from '../lib/appwrite';
import Loading from './Loading';
import UserDashboard from '../components/UserDashboard';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
        return <Loading />;
    }

    if (user) {
        return <UserDashboard email={user.email} handleLogout={handleLogout} />;
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center text-black">
                    Login or Sign up Page
                </h1>
                <form className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="button" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button
                            type="button"
                            onClick={handleRegister}
                            variant={'secondary'}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
