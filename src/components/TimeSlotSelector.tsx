import { TimeSlot } from '../types/models'

interface Props {
    timeSlots: TimeSlot[]
    onSelect: (slot: TimeSlot) => void
}

export default function TimeSlotSelector({ timeSlots, onSelect }: Props) {
    return (
        <ul className="space-y-3">
            {timeSlots.map((slot) => (
                <li
                    key={slot.id}
                    className="p-3 border rounded shadow-sm hover:bg-blue-50 cursor-pointer"
                    onClick={() => onSelect(slot)}
                >
                    <span className="font-medium">
                        {new Date(slot.startTime).toLocaleString()} –{' '}
                        {new Date(slot.endTime).toLocaleTimeString()}
                    </span>
                </li>
            ))}
        </ul>
    )
}
