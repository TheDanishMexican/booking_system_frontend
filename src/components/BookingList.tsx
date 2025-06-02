import { useEffect, useState } from 'react'
import { Booking } from '../types/models'

const BookingList = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings')
                const data = await res.json()
                setBookings(data)
            } catch (err) {
                console.error('Failed to fetch bookings', err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    if (loading) return <p>Loading bookings...</p>
    if (bookings.length === 0) return <p>No bookings yet.</p>

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <div key={booking.id} className="border rounded p-4">
                    <p>
                        <strong>Service:</strong>{' '}
                        {booking.timeSlot.offeredService.name}
                    </p>
                    <p>
                        <strong>Customer:</strong> {booking.name} (
                        {booking.email})
                    </p>
                    <p>
                        <strong>Time:</strong>{' '}
                        {new Date(booking.timeSlot.startTime).toLocaleString()}{' '}
                        –{' '}
                        {new Date(
                            booking.timeSlot.endTime
                        ).toLocaleTimeString()}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default BookingList
