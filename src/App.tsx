import { useEffect, useState } from 'react'

function App() {
    const [services, setServices] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [customer, setCustomer] = useState(null)
    const [booking, setBooking] = useState(null)

    const fetchServices = () => {
        fetch('http://localhost:8080/api/offered-services')
            .then((res) => res.json())
            .then(setServices)
            .catch(console.error)
    }

    const fetchTimeSlots = () => {
        fetch('http://localhost:8080/api/timeslots?serviceId=1')
            .then((res) => res.json())
            .then(setTimeSlots)
            .catch(console.error)
    }

    const createCustomer = () => {
        fetch('http://localhost:8080/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'John Test',
                email: 'john@example.com',
                phone: '12345678',
            }),
        })
            .then((res) => res.json())
            .then(setCustomer)
            .catch(console.error)
    }

    const createBooking = () => {
        fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerEmail: 'john@example.com',
                timeSlotId: 1,
            }),
        })
            .then((res) => res.json())
            .then(setBooking)
            .catch(console.error)
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>API Test Panel</h1>

            <button onClick={fetchServices}>Get Services</button>
            <button onClick={fetchTimeSlots}>
                Get TimeSlots for Service 1
            </button>
            <button onClick={createCustomer}>Create Customer</button>
            <button onClick={createBooking}>Create Booking</button>

            <pre>Services: {JSON.stringify(services, null, 2)}</pre>
            <pre>TimeSlots: {JSON.stringify(timeSlots, null, 2)}</pre>
            <pre>Customer: {JSON.stringify(customer, null, 2)}</pre>
            <pre>Booking: {JSON.stringify(booking, null, 2)}</pre>
        </div>
    )
}

export default App
