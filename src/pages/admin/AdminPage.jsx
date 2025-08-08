import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRoom, deleteRoom, updateRoom } from '../../store/slices/roomsSlice';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';
import RoomForm from '../../components/admin/RoomForm';
import Modal from '../../components/modal/Modal';

export default function AdminPage() {
	const dispatch = useDispatch();
	const { data: rooms, loading } = useSelector((state) => state.rooms);
	const [reviews, setReviews] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentRoom, setCurrentRoom] = useState(null);
	const [activeTab, setActiveTab] = useState('rooms');

	// Загрузка отзывов
	useEffect(() => {
		const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
		setReviews(storedReviews);
	}, []);

	const formatPrice = (price) => {
		return new Intl.NumberFormat('ru-RU').format(price);
	};

	const handleEdit = (room) => {
		setCurrentRoom(room);
		setIsModalOpen(true);
	};

	const handleDeleteRoom = (roomId) => {
		if (window.confirm('Вы уверены, что хотите удалить этот номер?')) {
			dispatch(deleteRoom(roomId));
		}
	};

	const handleDeleteReview = (reviewId) => {
		if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
			const updatedReviews = reviews.filter((r) => r.id !== reviewId);
			setReviews(updatedReviews);
			localStorage.setItem('reviews', JSON.stringify(updatedReviews));
		}
	};

	const handleSubmit = (formData) => {
		if (currentRoom) {
			// Обновление существующего номера
			dispatch(
				updateRoom({
					id: currentRoom.id,
					updates: formData,
				}),
			);
		} else {
			// Добавление нового номера
			const newRoom = {
				id: Date.now(),
				...formData,
				price: Number(formData.price),
			};
			dispatch(addRoom(newRoom));
		}
		setIsModalOpen(false);
		setCurrentRoom(null);
	};

	if (loading) return <Loader />;

	return (
		<div className="admin-page p-4">
			<h1 className="text-2xl font-bold mb-6">Панель администратора</h1>

			{/* Табы для переключения между разделами */}
			<div className="flex border-b mb-6">
				<button
					className={`px-4 py-2 font-medium ${
						activeTab === 'rooms'
							? 'border-b-2 border-blue-500 text-blue-600'
							: 'text-gray-500'
					}`}
					onClick={() => setActiveTab('rooms')}
				>
					Управление номерами
				</button>
				<button
					className={`px-4 py-2 font-medium ${
						activeTab === 'reviews'
							? 'border-b-2 border-blue-500 text-blue-600'
							: 'text-gray-500'
					}`}
					onClick={() => setActiveTab('reviews')}
				>
					Управление отзывами
				</button>
			</div>

			{/* Секция управления номерами */}
			{activeTab === 'rooms' && (
				<>
					<div className="admin-header flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">Управление номерами</h2>
						<Button
							onClick={() => {
								setCurrentRoom(null);
								setIsModalOpen(true);
							}}
						>
							+ Добавить номер
						</Button>
					</div>

					<table className="admin-table w-full border-collapse">
						<thead>
							<tr className="bg-gray-100">
								<th className="border p-2 text-left">ID</th>
								<th className="border p-2 text-left">Название</th>
								<th className="border p-2 text-left">Тип</th>
								<th className="border p-2 text-left">Цена</th>
								<th className="border p-2 text-left">Действия</th>
							</tr>
						</thead>
						<tbody>
							{rooms.map((room) => (
								<tr key={room.id}>
									<td className="border p-2">{room.id}</td>
									<td className="border p-2">{room.name}</td>
									<td className="border p-2">
										{room.type === 'standard'
											? 'Стандарт'
											: room.type === 'comfort'
											? 'Комфорт'
											: 'Люкс'}
									</td>
									<td className="border p-2">
										{formatPrice(room.price)} ₽
									</td>
									<td className="border p-2">
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="small"
												onClick={() => handleEdit(room)}
											>
												Редактировать
											</Button>
											<Button
												variant="outline"
												size="small"
												onClick={() => handleDeleteRoom(room.id)}
											>
												Удалить
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}

			{/* Секция управления отзывами */}
			{activeTab === 'reviews' && (
				<>
					<div className="admin-header mb-4">
						<h2 className="text-xl font-semibold">Управление отзывами</h2>
					</div>

					<table className="admin-table w-full border-collapse">
						<thead>
							<tr className="bg-gray-100">
								<th className="border p-2 text-left">ID</th>
								<th className="border p-2 text-left">Пользователь</th>
								<th className="border p-2 text-left">Оценка</th>
								<th className="border p-2 text-left">Текст</th>
								<th className="border p-2 text-left">Дата</th>
								<th className="border p-2 text-left">Действия</th>
							</tr>
						</thead>
						<tbody>
							{reviews.map((review) => (
								<tr key={review.id}>
									<td className="border p-2">{review.id}</td>
									<td className="border p-2">{review.userName}</td>
									<td className="border p-2">
										{'★'.repeat(review.rating)}
										{'☆'.repeat(5 - review.rating)}
									</td>
									<td className="border p-2">{review.text}</td>
									<td className="border p-2">{review.date}</td>
									<td className="border p-2">
										<Button
											variant="outline"
											size="small"
											onClick={() => handleDeleteReview(review.id)}
										>
											Удалить
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}

			{/* Модальное окно для редактирования/добавления номера */}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<RoomForm
					room={currentRoom}
					onSubmit={handleSubmit}
					onCancel={() => {
						setIsModalOpen(false);
						setCurrentRoom(null);
					}}
				/>
			</Modal>
		</div>
	);
}
