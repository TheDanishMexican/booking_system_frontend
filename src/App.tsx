import BookingPage from './pages/BookingPage'

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="p-4 shadow bg-white">
                <h1 className="text-xl font-bold text-center">
                    Book a Service
                </h1>
            </header>
            <main className="max-w-md mx-auto mt-8">
                <BookingPage />
            </main>
        </div>
    )
}

export default App
