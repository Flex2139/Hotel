import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/home/HomePage';
import RoomsPage from './pages/rooms/RoomsPage';
import RoomDetailsPage from './pages/rooms/RoomDetailsPage';
import MyBookingsPage from './pages/bookings/MyBookingsPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import Layout from './components/layout/Layout';
import ProfilePage from './pages/profile/ProfilePage';

// Новые страницы
import GalleryPage from './pages/gallery/GalleryPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ServicesPage from './pages/services/ServicesPage';

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Layout>
					<Routes>
						{/* Публичные маршруты */}
						<Route path="/" element={<HomePage />} />
						<Route path="/rooms" element={<RoomsPage />} />
						<Route path="/rooms/:id" element={<RoomDetailsPage />} />
						<Route path="/gallery" element={<GalleryPage />} />
						<Route path="/reviews" element={<ReviewsPage />} />
						<Route path="/services" element={<ServicesPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />

						{/* Приватные маршруты */}
						<Route element={<PrivateRoute />}>
							<Route path="/my-bookings" element={<MyBookingsPage />} />
							<Route path="/profile" element={<ProfilePage />} />
						</Route>

						{/* Админские маршруты */}
						<Route element={<AdminRoute />}>
							<Route path="/admin" element={<AdminPage />} />
						</Route>

						{/* 404 */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Layout>
			</AuthProvider>
		</BrowserRouter>
	);
}
