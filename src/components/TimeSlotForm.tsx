import { useState } from 'react'
import { OfferedService } from '../types/models'

type Props = {
    services: OfferedService[]
    onSuccess: () => void
}

export default function TimeSlotForm({ services, onSuccess }: Props) {
    const [selectedServiceId, setSelectedServiceId] = useState<string>('')
    const [startTime, setStartTime] = useState('')
    const [duration, setDuration] = useState('')
    const [message, setMessage] = useState('')
    const [location, setLocation] = useState('')

    const handleCreateTimeSlot = async () => {
        if (!selectedServiceId || !startTime || !duration || !location) {
            setMessage('Please fill in all fields.')
            return
        }

        const start = new Date(startTime)
        const end = new Date(start.getTime() + Number(duration) * 60000)

        try {
            const res = await fetch('/api/timeslots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    offeredServiceId: Number(selectedServiceId),
                    startTime: start.toISOString(),
                    endTime: end.toISOString(),
                    location,
                }),
            })

            if (!res.ok) throw new Error('Failed to create time slot')

            setMessage('✅ Time slot created!')
            setStartTime('')
            setDuration('')
            setSelectedServiceId('')
            setLocation('')
            onSuccess()
        } catch (err) {
            console.error(err)
            setMessage('❌ Could not create time slot.')
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="block mb-1">Choose a service</label>
                <select
                    className="w-full border rounded p-2"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                    <option value="">-- Select a service --</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1">Start time</label>
                <input
                    type="datetime-local"
                    className="w-full border rounded p-2"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1">Location</label>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (e.g. Zoom, Office)"
                />
            </div>

            <div>
                <label className="block mb-1">Duration (minutes)</label>
                <input
                    type="number"
                    className="w-full border rounded p-2"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min={1}
                />
            </div>

            <button
                className="w-full bg-blue-600 text-white py-2 rounded"
                onClick={handleCreateTimeSlot}
            >
                Create Time Slot
            </button>

            {message && <p className="mt-2 text-sm text-center">{message}</p>}
        </div>
    )
}
