import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelBooking, initBookings } from '../../store/slices/bookingsSlice';
import Loader from '../../components/loader/Loader';
import Button from '../../components/button/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyBookingsPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const { list: bookings, loading, error } = useSelector((state) => state.bookings);
	const { data: rooms } = useSelector((state) => state.rooms);

	// Инициализация бронирований при загрузке
	useEffect(() => {
		const savedBookings = localStorage.getItem('bookingsState');
		if (savedBookings) {
			dispatch(initBookings(JSON.parse(savedBookings)));
		}
	}, [dispatch]);

	// Фильтруем бронирования текущего пользователя
	const userBookings = bookings.filter(
		(booking) => booking.userEmail === currentUser?.email,
	);

	// Функция для получения названия номера по ID
	const getRoomName = (roomId) => {
		const room = rooms.find((r) => r.id === roomId);
		return room ? room.name : `Номер #${roomId}`;
	};

	// Форматирование даты
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	// Обработка отмены бронирования
	const handleCancelBooking = (bookingId) => {
		if (window.confirm('Вы уверены, что хотите отменить бронирование?')) {
			dispatch(cancelBooking(bookingId));
		}
	};

	if (!currentUser) {
		return (
			<div className="my-bookings-page">
				<h1>Мои бронирования</h1>
				<p>Для просмотра бронирований войдите в систему</p>
				<Button onClick={() => navigate('/login')}>Войти</Button>
			</div>
		);
	}

	if (loading) return <Loader />;

	if (error) {
		return (
			<div className="my-bookings-page">
				<h1>Мои бронирования</h1>
				<p className="error">Ошибка загрузки: {error}</p>
			</div>
		);
	}

	return (
		<div className="my-bookings-page">
			<h1>Мои бронирования</h1>

			{userBookings.length === 0 ? (
				<div className="no-bookings">
					<p>У вас нет активных бронирований</p>
					<Button onClick={() => navigate('/rooms')} variant="primary">
						Посмотреть номера
					</Button>
				</div>
			) : (
				<div className="bookings-list">
					{userBookings.map((booking) => (
						<div key={booking.id} className="booking-card">
							<div className="booking-header">
								<h2>{getRoomName(booking.roomId)}</h2>
								<span className={`status-badge status-${booking.status}`}>
									{booking.status === 'confirmed'
										? 'Подтверждено'
										: booking.status === 'canceled'
										? 'Отменено'
										: 'Ожидание'}
								</span>
							</div>

							<div className="booking-details">
								<p>
									<strong>Дата заезда:</strong>{' '}
									{formatDate(booking.checkIn)}
								</p>
								<p>
									<strong>Дата выезда:</strong>{' '}
									{formatDate(booking.checkOut)}
								</p>
								<p>
									<strong>Гости:</strong> {booking.guests}
								</p>
								<p>
									<strong>ID бронирования:</strong> #{booking.id}
								</p>
							</div>

							{booking.status === 'confirmed' && (
								<div className="booking-actions">
									<Button
										variant="outline"
										onClick={() => handleCancelBooking(booking.id)}
									>
										Отменить бронирование
									</Button>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
