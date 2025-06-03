import { useEffect, useState } from 'react'
import { OfferedService } from '../types/models'
import TimeSlotForm from '../components/TimeSlotForm'
import ServiceForm from '../components/ServiceForm'
import BookingList from '../components/BookingList'
import AdminViewButtons from '../components/AdminViewButtons'

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
                if (!res.ok) throw new Error(`Server error: ${res.status}`) // ✅ Catches server response errors

                const data = await res.json()
                setServices(data) // ✅ Only happens if data is valid
            } catch (err) {
                console.error('Failed to load services', err) // ✅ Developer feedback
                alert('Kunne ikke hente services. Prøv igen senere.') // ✅ User feedback
            } finally {
                setLoading(false) // ✅ Ensures app state is handled properly
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

            <AdminViewButtons currentView={view} onChange={setView} />

            {view === 'timeslots' && <TimeSlotForm services={services} />}

            {view === 'services' && (
                <ServiceForm onServiceCreated={handleServiceCreated} />
            )}

            {view === 'bookings' && <BookingList />}
        </div>
    )
}
