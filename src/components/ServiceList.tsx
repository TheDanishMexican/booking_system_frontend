import { OfferedService } from '../types/models'

interface Props {
    services: OfferedService[]
    onSelect: (service: OfferedService) => void
}

export default function ServiceList({ services, onSelect }: Props) {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Available Services</h2>
            <ul className="space-y-4">
                {services.map((service) => (
                    <li
                        key={service.id}
                        className="p-4 border rounded shadow-sm hover:bg-gray-50 cursor-pointer"
                        onClick={() => onSelect(service)}
                    >
                        <h3 className="font-bold text-lg">{service.name}</h3>
                        <p className="text-sm text-gray-600">
                            {service.description}
                        </p>
                        <p className="text-sm mt-1">{service.price} DKK</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
