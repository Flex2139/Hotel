import { useSelector, useDispatch } from 'react-redux';
import { cancelBooking } from '../../store/slices/bookingsSlice';
import Loader from '../../components/loader/Loader';
import Button from '../../components/button/Button';
import { useAuth } from '../../hooks/use-auth';

export default function MyBookingsPage() {
	const dispatch = useDispatch();
	const { user } = useAuth();
	const { list: bookings, loading } = useSelector((state) => state.bookings);
	const { data: rooms } = useSelector((state) => state.rooms);

	// Фильтруем бронирования текущего пользователя
	const userBookings = bookings.filter((booking) => booking.userEmail === user?.email);

	// Функция для получения названия номера по ID
	const getRoomName = (roomId) => {
		const room = rooms.find((r) => r.id === roomId);
		return room ? room.name : `Номер #${roomId}`;
	};

	// Форматирование даты
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('ru-RU');
	};

	// Обработка отмены бронирования
	const handleCancelBooking = (bookingId) => {
		dispatch(cancelBooking(bookingId));
	};

	if (loading) return <Loader />;

	return (
		<div className="my-bookings-page">
			<h1>Мои бронирования</h1>

			{userBookings.length === 0 ? (
				<p>У вас нет активных бронирований</p>
			) : (
				<table className="bookings-table">
					<thead>
						<tr>
							<th>ID бронирования</th>
							<th>Номер</th>
							<th>Дата заезда</th>
							<th>Дата выезда</th>
							<th>Гости</th>
							<th>Статус</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{userBookings.map((booking) => (
							<tr key={booking.id}>
								<td>#{booking.id}</td>
								<td>{getRoomName(booking.roomId)}</td>
								<td>{formatDate(booking.checkIn)}</td>
								<td>{formatDate(booking.checkOut)}</td>
								<td>{booking.guests}</td>
								<td className={`status-${booking.status}`}>
									{booking.status === 'confirmed'
										? 'Подтверждено'
										: booking.status === 'canceled'
										? 'Отменено'
										: 'Ожидание'}
								</td>
								<td>
									{booking.status === 'confirmed' && (
										<Button
											variant="outline"
											onClick={() =>
												handleCancelBooking(booking.id)
											}
										>
											Отменить
										</Button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
