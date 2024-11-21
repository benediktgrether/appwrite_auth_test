import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
    handleLogin: (email: string, password: string) => void;
    handleRegister: (email: string, password: string) => void;
}

export default function AuthForm({
    handleLogin,
    handleRegister,
}: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            type="button"
                            onClick={() => handleLogin(email, password)}
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleRegister(email, password)}
                            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
