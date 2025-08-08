import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/use-api';
import { useAuth } from '../../hooks/use-auth';
import BookingForm from '../../components/booking-form/BookingForm';
import Loader from '../../components/loader/Loader';
import Button from '../../components/button/Button';

export default function RoomDetailsPage() {
	const { id } = useParams();
	const { isAuth } = useAuth();
	const { fetchData, loading, error } = useApi();
	const room = useSelector((state) =>
		state.rooms.rooms.find((room) => room.id === parseInt(id)),
	);

	const handleBookingSubmit = async (bookingData) => {
		if (!isAuth) {
			alert('Для бронирования войдите в систему!');
			return;
		}

		try {
			const result = await fetchData('/api/bookings', 'POST', bookingData);
			console.log('Бронирование подтверждено:', result);
			alert('Номер успешно забронирован!');
		} catch (err) {
			console.error('Ошибка бронирования:', err);
			alert('Ошибка при бронировании. Попробуйте позже.');
		}
	};

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
					<strong>Удобства:</strong> {room.amenities.join(', ')}
				</p>
				<p>{room.description}</p>
			</div>

			<div className="booking-section">
				<h2>Забронировать номер</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<p className="error">{error}</p>
				) : (
					<BookingForm roomId={room.id} onSubmit={handleBookingSubmit} />
				)}
			</div>
		</div>
	);
}
