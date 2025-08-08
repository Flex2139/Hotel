import { useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

export default function BookingForm({ roomId, onSubmit }) {
	const [dates, setDates] = useState({
		checkIn: '',
		checkOut: '',
	});
	const [guests, setGuests] = useState(1);
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};

		// Проверка даты заезда
		if (!dates.checkIn) {
			newErrors.checkIn = 'Укажите дату заезда';
		} else {
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const checkInDate = new Date(dates.checkIn);

			if (checkInDate < today) {
				newErrors.checkIn = 'Дата заезда не может быть в прошлом';
			}
		}

		// Проверка даты выезда
		if (!dates.checkOut) {
			newErrors.checkOut = 'Укажите дату выезда';
		} else if (dates.checkIn) {
			const checkInDate = new Date(dates.checkIn);
			const checkOutDate = new Date(dates.checkOut);

			if (checkOutDate <= checkInDate) {
				newErrors.checkOut = 'Дата выезда должна быть позже даты заезда';
			}
		}

		// Проверка количества гостей
		if (guests < 1 || guests > 4) {
			newErrors.guests = 'Количество гостей должно быть от 1 до 4';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			onSubmit({
				roomId,
				...dates,
				guests,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Забронировать номер</h3>

			<Input
				type="date"
				value={dates.checkIn}
				onChange={(value) => setDates({ ...dates, checkIn: value })}
				error={errors.checkIn} // Передаем ошибку в компонент Input
			/>
			{errors.checkIn && <div className="error-text">{errors.checkIn}</div>}

			<Input
				type="date"
				value={dates.checkOut}
				onChange={(value) => setDates({ ...dates, checkOut: value })}
				error={errors.checkOut}
			/>
			{errors.checkOut && <div className="error-text">{errors.checkOut}</div>}

			<Input
				type="number"
				placeholder="Гости"
				value={guests}
				onChange={setGuests}
				min="1"
				max="4"
				error={errors.guests}
			/>
			{errors.guests && <div className="error-text">{errors.guests}</div>}

			<Button type="submit">Подтвердить</Button>
		</form>
	);
}
