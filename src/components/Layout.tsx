import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <header className="bg-white shadow p-4 flex justify-between">
                <h1 className="font-bold text-lg">Trainer Booking</h1>
                <nav className="space-x-4">
                    <Link to="/" className="text-blue-600 hover:underline">
                        Booking
                    </Link>
                    <Link to="/admin" className="text-blue-600 hover:underline">
                        Admin
                    </Link>
                </nav>
            </header>
            <main className="max-w-xl mx-auto mt-6">
                <Outlet />
            </main>
        </div>
    )
}
