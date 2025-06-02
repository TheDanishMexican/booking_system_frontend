import { useState } from 'react'
import { OfferedService, TimeSlot } from '../types/models'

type Props = {
    serviceId: number
    timeSlotId: number
    selectedService: OfferedService
    selectedSlot: TimeSlot
    onSuccess: () => void
}

export default function BookingForm({
    serviceId,
    timeSlotId,
    onSuccess,
    selectedService,
    selectedSlot,
}: Props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const validate = () => {
        if (!name || !email || !confirmEmail || !phone) {
            return 'Please fill in all fields.'
        }
        if (email !== confirmEmail) {
            return 'Emails do not match.'
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Please enter a valid email.'
        }
        if (!/^\+?[0-9\s\-()]{6,}$/.test(phone)) {
            return 'Please enter a valid phone number.'
        }
        return ''
    }

    const handleSubmit = async () => {
        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceId,
                    timeSlotId,
                    name,
                    email,
                    phone,
                }),
            })

            if (!res.ok) throw new Error('Booking failed')

            onSuccess()
        } catch (err) {
            console.error(err)
            setError('❌ Could not complete booking.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 border rounded space-y-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-center mb-2">
                Complete Your Booking
            </h2>

            <div className="bg-gray-50 p-3 rounded border text-sm">
                <p>
                    <strong>Service:</strong> {selectedService.name}
                </p>
                <p>
                    <strong>Time:</strong>{' '}
                    {new Date(selectedSlot.startTime).toLocaleString()}
                </p>
                <p>
                    <strong>Location:</strong> {selectedSlot.location}
                </p>
            </div>

            <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                    type="email"
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Confirm Email</label>
                <input
                    type="email"
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
        </div>
    )
}
