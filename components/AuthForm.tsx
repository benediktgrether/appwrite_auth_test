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
                        />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <Button onClick={() => handleLogin(email, password)}>
                            Login
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => handleRegister(email, password)}
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
