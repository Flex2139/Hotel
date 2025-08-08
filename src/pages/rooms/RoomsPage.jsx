import { useState } from 'react';
import { useSelector } from 'react-redux';
import RoomCard from '../../components/room/RoomCard';
import Loader from '../../components/loader/Loader';

export default function RoomsPage() {
	const [roomType, setRoomType] = useState('all');
	const [sortOrder, setSortOrder] = useState('asc');
	const { data: rooms, loading } = useSelector((state) => state.rooms);

	// Фильтрация по типу номера
	const filteredRooms =
		roomType === 'all' ? [...rooms] : rooms.filter((room) => room.type === roomType);

	// Сортировка по цене
	const sortedRooms = [...filteredRooms].sort((a, b) => {
		if (sortOrder === 'asc') return a.price - b.price;
		return b.price - a.price;
	});

	if (loading) return <Loader />;

	return (
		<div className="rooms-page">
			<h1>Наши номера</h1>

			<div className="controls">
				{/* Фильтр по типу номера */}
				<div className="filter-section">
					<h3>Тип номера:</h3>
					<div className="filter-buttons">
						<button
							className={roomType === 'all' ? 'active' : ''}
							onClick={() => setRoomType('all')}
						>
							Все
						</button>
						<button
							className={roomType === 'standard' ? 'active' : ''}
							onClick={() => setRoomType('standard')}
						>
							Стандарт
						</button>
						<button
							className={roomType === 'comfort' ? 'active' : ''}
							onClick={() => setRoomType('comfort')}
						>
							Комфорт
						</button>
						<button
							className={roomType === 'luxury' ? 'active' : ''}
							onClick={() => setRoomType('luxury')}
						>
							Люкс
						</button>
					</div>
				</div>

				{/* Сортировка по цене */}
				<div className="sort-section">
					<h3>Сортировка:</h3>
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
						className="sort-select"
					>
						<option value="asc">Цена по возрастанию</option>
						<option value="desc">Цена по убыванию</option>
					</select>
				</div>
			</div>

			<div className="rooms-grid">
				{sortedRooms.length === 0 ? (
					<p>Нет доступных номеров по выбранным критериям</p>
				) : (
					sortedRooms.map((room) => <RoomCard key={room.id} room={room} />)
				)}
			</div>
		</div>
	);
}
