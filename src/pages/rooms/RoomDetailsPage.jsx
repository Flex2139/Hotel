import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/use-api';
import { useAuth } from '../../context/AuthContext'; // Используем наш контекст
import BookingForm from '../../components/booking-form/BookingForm';
import Loader from '../../components/loader/Loader';
import Button from '../../components/button/Button';

export default function RoomDetailsPage() {
	const { id } = useParams();
	const { currentUser } = useAuth(); // Используем currentUser вместо isAuth
	const { fetchData, loading, error } = useApi();

	// Безопасное получение комнаты
	const room = useSelector((state) => {
		return state.rooms.data.find((room) => room.id === parseInt(id));
	});

	const handleBookingSubmit = async (bookingData) => {
		if (!currentUser) {
			alert('Для бронирования войдите в систему!');
			return;
		}

		try {
			const result = await fetchData('/api/bookings', 'POST', {
				...bookingData,
				userId: currentUser.id, // Добавляем ID пользователя
			});
			console.log('Бронирование подтверждено:', result);
			alert('Номер успешно забронирован!');
		} catch (err) {
			console.error('Ошибка бронирования:', err);
			alert('Ошибка при бронировании. Попробуйте позже.');
		}
	};

	// Загрузка данных
	if (loading) return <Loader />;

	// Обработка ошибок
	if (error) return <div className="error">Ошибка загрузки: {error}</div>;

	// Номер не найден
	if (!room) {
		return (
			<div className="room-not-found">
				<h2>Номер не найден</h2>
				<Button onClick={() => window.history.back()}>Назад к списку</Button>
			</div>
		);
	}

	return (
		<div className="room-details">
			<h1>{room.name}</h1>
			<img
				src={room.image || '/placeholder-room.jpg'}
				alt={room.name}
				className="room-image"
			/>
			<div className="room-info">
				<p>
					<strong>Цена за ночь:</strong> {room.price} ₽
				</p>
				<p>
					<strong>Этаж:</strong> {room.floor}
				</p>
				<p>
					<strong>Удобства:</strong>{' '}
					{room.amenities?.join(', ') || 'Нет информации'}
				</p>
				<p>{room.description}</p>
			</div>

			<div className="booking-section">
				<h2>Забронировать номер</h2>
				<BookingForm
					roomId={room.id}
					onSubmit={handleBookingSubmit}
					disabled={!currentUser}
				/>
			</div>
		</div>
	);
}
