import { useEffect, useState } from 'react'
import { OfferedService } from '../types/models'
import TimeSlotForm from '../components/TimeSlotForm'
import ServiceForm from '../components/ServiceForm'
import BookingList from '../components/BookingList'

export default function AdminPage() {
    const [services, setServices] = useState<OfferedService[]>([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState<'timeslots' | 'services' | 'bookings'>(
        'bookings'
    )

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/offered-services')
                const data = await res.json()
                setServices(data)
            } catch (err) {
                console.error('Failed to load services', err)
            } finally {
                setLoading(false)
            }
        }

        fetchServices()
    }, [])

    const handleServiceCreated = (newService: OfferedService) => {
        setServices((prev) => [...prev, newService])
    }

    if (loading) return <p className="text-center">Loading services...</p>

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => setView('timeslots')}
                    className={`px-4 py-2 rounded ${
                        view === 'timeslots'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}
                >
                    Time Slots
                </button>
                <button
                    onClick={() => setView('services')}
                    className={`px-4 py-2 rounded ${
                        view === 'services'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}
                >
                    Services
                </button>
                <button
                    onClick={() => setView('bookings')}
                    className={`px-4 py-2 rounded ${
                        view === 'bookings'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}
                >
                    Bookings
                </button>
            </div>

            {/* Conditional Rendering */}
            {view === 'timeslots' && (
                <TimeSlotForm
                    services={services}
                    onSuccess={() =>
                        console.log('Trainer created new time slot')
                    }
                />
            )}

            {view === 'services' && (
                <ServiceForm onServiceCreated={handleServiceCreated} />
            )}

            {view === 'bookings' && <BookingList />}
        </div>
    )
}
