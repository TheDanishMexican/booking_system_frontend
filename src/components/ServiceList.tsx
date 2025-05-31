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
        <ul className="p-4 space-y-2">
            {services.map((service) => {
                const isSelected = selectedService?.id === service.id

                return (
                    <li
                        key={service.id}
                        onClick={() => onSelect(service)}
                        className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                            isSelected ? 'bg-blue-100 border-blue-400' : ''
                        }`}
                    >
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">
                            DKK {service.price}
                        </p>
                    </li>
                )
            })}
        </ul>
    )
}
