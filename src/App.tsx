import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'
import Layout from './components/Layout'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<BookingPage />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
