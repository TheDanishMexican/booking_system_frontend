import { useEffect, useState } from 'react'
import { OfferedService } from '../types/models'
import TimeSlotForm from '../components/TimeSlotForm'

export default function AdminPage() {
    const [services, setServices] = useState<OfferedService[]>([])
    const [loading, setLoading] = useState(true)

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

    if (loading) return <p className="text-center">Loading services...</p>

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <TimeSlotForm
                services={services}
                onSuccess={() => console.log('Trainer created new time slot')}
            />
        </div>
    )
}
