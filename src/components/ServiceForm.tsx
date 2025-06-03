import { useState } from 'react'
import { OfferedService } from '../types/models'

type Props = {
    onServiceCreated: (service: OfferedService) => void
}

export default function ServiceForm({ onServiceCreated }: Props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const validateInputs = () => {
        if (!name || !price) {
            setMessage('Please fill in all required fields.')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateInputs()) return

        setLoading(true)
        setMessage('')

        try {
            const res = await fetch('/api/offered-services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, price }),
            })

            if (!res.ok) throw new Error(`Server error: ${res.status}`)

            const created = await res.json()
            onServiceCreated(created)

            setName('')
            setDescription('')
            setPrice('')
            setMessage('✅ Service created successfully.')
        } catch (err) {
            console.error('Failed to create service', err)
            setMessage('❌ Failed to create service.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Service Name"
                className="w-full border p-2 rounded"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (DKK)"
                className="w-full border p-2 rounded"
                min={0}
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full border p-2 rounded"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Service'}
            </button>

            {message && (
                <p className="text-sm text-center text-gray-700">{message}</p>
            )}
        </form>
    )
}
