import { FC } from 'react'

interface Props {
    onHomeClick: () => void
}

const Header: FC<Props> = ({ onHomeClick }) => (
    <header className="bg-blue-600 text-white p-4 mb-4">
        <div className="max-w-xl mx-auto flex justify-between items-center">
            <h1
                className="text-xl font-semibold cursor-pointer"
                onClick={onHomeClick}
            >
                Trainer Booking
            </h1>
        </div>
    </header>
)

export default Header
