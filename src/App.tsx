import { useEffect, useState } from 'react'
import Header from './components/Header'
import ServiceList from './components/ServiceList'
import TimeSlotSelector from './components/TimeSlotSelector'
import { OfferedService, TimeSlot } from './types/models'

function App() {
    const [services, setServices] = useState<OfferedService[]>([])
    const [selectedService, setSelectedService] =
        useState<OfferedService | null>(null)
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/api/offered-services')
            .then((res) => res.json())
            .then(setServices)
            .catch(console.error)
    }, [])

    const handleServiceSelect = (service: OfferedService) => {
        setSelectedService(service)
        fetch(`http://localhost:8080/api/timeslots/service/${service.id}`)
            .then((res) => res.json())
            .then(setTimeSlots)
            .catch(console.error)
    }

    const handleGoHome = () => {
        setSelectedService(null)
        setTimeSlots([])
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onHomeClick={handleGoHome} />

            <main className="p-4 max-w-xl mx-auto">
                <ServiceList
                    services={services}
                    onSelect={handleServiceSelect}
                />

                {selectedService && (
                    <>
                        <h2 className="text-xl font-semibold mt-6 mb-2">
                            Time Slots for: {selectedService.name}
                        </h2>
                        <TimeSlotSelector
                            timeSlots={timeSlots}
                            onSelect={(slot) =>
                                console.log('Selected timeslot:', slot)
                            }
                        />
                    </>
                )}
            </main>
        </div>
    )
}

export default App
