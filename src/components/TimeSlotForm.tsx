import { useState } from 'react'
import { OfferedService } from '../types/models'

type Props = {
    services: OfferedService[]
    onSuccess: () => void
}

export default function TimeSlotForm({ services, onSuccess }: Props) {
    const [selectedServiceId, setSelectedServiceId] = useState<string>('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [message, setMessage] = useState('')

    const handleCreateTimeSlot = async () => {
        if (!selectedServiceId || !startTime) {
            setMessage('Please select a service and time.')
            return
        }

        try {
            const res = await fetch('/api/timeslots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    offeredServiceId: Number(selectedServiceId),
                    startTime: new Date(startTime).toISOString(),
                    endTime: new Date(endTime).toISOString(),
                }),
            })

            if (!res.ok) throw new Error('Failed to create time slot')

            setMessage('✅ Time slot created!')
            setStartTime('')
            setEndTime('')
            setSelectedServiceId('')
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
                <label className="block mb-1">End time</label>
                <input
                    type="datetime-local"
                    className="w-full border rounded p-2"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
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
