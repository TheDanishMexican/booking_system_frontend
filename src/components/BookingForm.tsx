import { useState } from 'react'

type Props = {
    serviceId: number
    timeSlotId: number
    onSuccess: () => void
}

export default function BookingForm({
    serviceId,
    timeSlotId,
    onSuccess,
}: Props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        setError('')
        if (email !== confirmEmail) {
            setError('Emails do not match')
            return
        }

        setLoading(true)
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
            setError('Could not complete booking')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 border rounded mt-6 space-y-4">
            <div>
                <label className="block mb-1">Name</label>
                <input
                    className="w-full border rounded p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1">Email</label>
                <input
                    type="email"
                    className="w-full border rounded p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1">Confirm Email</label>
                <input
                    type="email"
                    className="w-full border rounded p-2"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1">Phone</label>
                <input
                    className="w-full border rounded p-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
                className="w-full bg-blue-500 text-white py-2 rounded"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
        </div>
    )
}
