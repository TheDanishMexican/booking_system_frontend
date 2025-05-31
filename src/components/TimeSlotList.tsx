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
        <ul className="p-4 space-y-2">
            {slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id

                return (
                    <li
                        key={slot.id}
                        onClick={() => onSelect(slot)}
                        className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
                            isSelected ? 'bg-blue-100 border-blue-400' : ''
                        }`}
                    >
                        {new Date(slot.startTime).toLocaleString()}
                    </li>
                )
            })}
        </ul>
    )
}
