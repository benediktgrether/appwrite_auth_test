interface UserDashboardProps {
    email: string;
    handleLogout: () => void;
}

export default function UserDashboard({
    email,
    handleLogout,
}: UserDashboardProps) {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center text-black">
                    Welcome {email}
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
