import { OfferedService } from '../types/models'

type Props = {
    services: OfferedService[]
    selectedService: OfferedService | null
    onSelect: (service: OfferedService) => void
}

export default function ServiceList({
    services,
    selectedService,
    onSelect,
}: Props) {
    return (
        <ul className="space-y-3">
            {services.map((service) => {
                const isSelected = selectedService?.id === service.id

                return (
                    <li
                        key={service.id}
                        onClick={() => onSelect(service)}
                        className={`border rounded-lg p-4 shadow-sm cursor-pointer transition 
                            ${
                                isSelected
                                    ? 'bg-blue-100 border-blue-400'
                                    : 'hover:bg-gray-50'
                            }`}
                    >
                        <p className="text-lg font-semibold">{service.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                            💰 DKK {service.price}
                        </p>
                        {service.description && (
                            <p className="text-sm text-gray-500 mt-1">
                                {service.description}
                            </p>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
