// src/components/room/RoomCard.jsx
import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
	const formatPrice = (price) => {
		return new Intl.NumberFormat('ru-RU').format(price);
	};

	return (
		<div className="room-card">
			{room.image && (
				<div className="room-image">
					<img src={room.image} alt={room.name} />
				</div>
			)}

			<div className="room-info">
				<h3>{room.name}</h3>
				<p className="room-type">
					Тип:{' '}
					{room.type === 'standard'
						? 'Стандарт'
						: room.type === 'comfort'
						? 'Комфорт'
						: 'Люкс'}
				</p>
				<p className="room-price">{formatPrice(room.price)} ₽ / ночь</p>
				<p className="room-description">{room.description}</p>

				{room.amenities && (
					<div className="room-amenities">
						<strong>Удобства:</strong>
						<ul>
							{room.amenities.slice(0, 3).map((item, index) => (
								<li key={index}>{item}</li>
							))}
							{room.amenities.length > 3 && (
								<li>+{room.amenities.length - 3} еще</li>
							)}
						</ul>
					</div>
				)}

				<Link to={`/rooms/${room.id}`} className="details-link">
					Подробнее
				</Link>
			</div>
		</div>
	);
}
