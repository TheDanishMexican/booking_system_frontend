import { useEffect, useState } from 'react'
import { TimeSlot } from '../types/models'

type Props = {
    serviceId: number
    selectedSlotId: number | null
    onSelect: (slot: TimeSlot) => void
}

export default function TimeSlotList({
    serviceId,
    selectedSlotId,
    onSelect,
}: Props) {
    const [slots, setSlots] = useState<TimeSlot[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await fetch(`/api/timeslots/service/${serviceId}`)
                const data = await res.json()
                setSlots(data)
            } catch (err) {
                console.error('Failed to load time slots', err)
            } finally {
                setLoading(false)
            }
        }

        fetchSlots()
    }, [serviceId])

    if (loading)
        return <p className="text-center mt-4">Loading time slots...</p>

    return (
        <ul className="space-y-3">
            {slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id
                const start = new Date(slot.startTime)
                const end = new Date(slot.endTime)

                return (
                    <li
                        key={slot.id}
                        onClick={() => onSelect(slot)}
                        className={`border rounded-lg p-4 shadow-sm cursor-pointer transition 
                            ${
                                isSelected
                                    ? 'bg-blue-100 border-blue-400'
                                    : 'hover:bg-gray-50'
                            }`}
                    >
                        <div className="font-semibold text-lg">
                            {start.toLocaleDateString()} —{' '}
                            {start.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}{' '}
                            to{' '}
                            {end.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            📍 {slot.location}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
