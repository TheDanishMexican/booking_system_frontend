import { useState } from 'react'
import { OfferedService } from '../types/models'

type Props = {
    onServiceCreated: (service: OfferedService) => void
}

export default function ServiceList({ onServiceCreated }: Props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/offered-services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, price }),
        })

        if (res.ok) {
            const created = await res.json()
            onServiceCreated(created)
            setName('')
            setDescription('')
            setPrice('')
        } else {
            alert('Failed to create service')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Service Name"
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (DKK)"
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full border p-2 rounded"
            />
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Create Service
            </button>
        </form>
    )
}
