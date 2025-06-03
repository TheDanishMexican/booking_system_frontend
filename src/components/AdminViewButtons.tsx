type Props = {
    currentView: 'timeslots' | 'services' | 'bookings'
    onChange: (view: 'timeslots' | 'services' | 'bookings') => void
}

export default function AdminViewButtons({ currentView, onChange }: Props) {
    const views: Array<'timeslots' | 'services' | 'bookings'> = [
        'timeslots',
        'services',
        'bookings',
    ]

    const labels = {
        timeslots: 'Time Slots',
        services: 'Services',
        bookings: 'Bookings',
    }

    return (
        <div className="flex space-x-2 mb-4">
            {views.map((view) => (
                <button
                    key={view}
                    onClick={() => onChange(view)}
                    className={`px-4 py-2 rounded ${
                        currentView === view
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}
                >
                    {labels[view]}
                </button>
            ))}
        </div>
    )
}
