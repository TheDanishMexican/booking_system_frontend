import { useEffect, useState } from 'react'
import { OfferedService, TimeSlot } from '../types/models'
import ServiceList from '../components/ServiceList'
import TimeSlotList from '../components/TimeSlotList'
import BookingForm from '../components/BookingForm'

export default function BookingPage() {
    const [services, setServices] = useState<OfferedService[]>([])
    const [selectedService, setSelectedService] =
        useState<OfferedService | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
    const [bookingComplete, setBookingComplete] = useState(false)
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

    if (loading) return <p className="text-center">Loading...</p>

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Choose a service</h2>
            <ServiceList
                services={services}
                selectedService={selectedService}
                onSelect={(service) => {
                    setSelectedService(service)
                    setSelectedSlot(null)
                    setBookingComplete(false)
                }}
            />

            {selectedService && (
                <>
                    <p className="mt-4 text-green-600">
                        Selected: <strong>{selectedService.name}</strong>
                    </p>

                    <h3 className="mt-6 mb-2 font-semibold">
                        Choose a time slot
                    </h3>
                    <TimeSlotList
                        serviceId={selectedService.id}
                        selectedSlotId={selectedSlot?.id || null}
                        onSelect={setSelectedSlot}
                    />
                </>
            )}

            {selectedService && selectedSlot && !bookingComplete && (
                <BookingForm
                    serviceId={selectedService.id}
                    timeSlotId={selectedSlot.id}
                    onSuccess={() => setBookingComplete(true)}
                />
            )}

            {bookingComplete && (
                <p className="mt-6 text-green-600 font-medium">
                    ✅ Your booking request has been received. Please check your
                    email to confirm it.
                </p>
            )}
        </div>
    )
}
