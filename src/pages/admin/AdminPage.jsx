import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/use-api';

export default function AdminPage() {
	const { user } = useSelector((state) => state.auth);
	const { request, loading, error } = useApi();
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		if (user && user.role === 'admin') {
			fetchBookings();
		}
	}, [user]);

	const fetchBookings = async () => {
		try {
			const data = await request('/api/admin/bookings');
			setBookings(data);
		} catch (err) {
			console.error('Ошибка загрузки бронирований:', err);
		}
	};

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<div className="admin-page">
			<h1>Панель администратора</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Гость</th>
						<th>Номер</th>
						<th>Даты</th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking) => (
						<tr key={booking.id}>
							<td>{booking.id}</td>
							<td>{booking.userName}</td>
							<td>{booking.roomName}</td>
							<td>
								{booking.startDate} - {booking.endDate}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
