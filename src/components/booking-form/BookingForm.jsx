import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../button/Button';

const BookingForm = ({ roomId, onSubmit, disabled }) => {
	const { currentUser } = useAuth();
	const [formData, setFormData] = useState({
		startDate: '',
		endDate: '',
		guests: 1,
		specialRequests: '',
	});
	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};

		if (!formData.startDate) newErrors.startDate = 'Укажите дату заезда';
		if (!formData.endDate) newErrors.endDate = 'Укажите дату выезда';
		if (formData.guests < 1) newErrors.guests = 'Минимум 1 гость';
		if (new Date(formData.endDate) < new Date(formData.startDate)) {
			newErrors.endDate = 'Дата выезда должна быть после даты заезда';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'guests' ? parseInt(value) || 0 : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validate()) return;
		if (disabled) return;

		onSubmit({
			roomId,
			userId: currentUser?.id,
			...formData,
			status: 'pending', // Статус бронирования
		});
	};

	return (
		<form className="booking-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Дата заезда:</label>
				<input
					type="date"
					name="startDate"
					value={formData.startDate}
					onChange={handleChange}
					min={new Date().toISOString().split('T')[0]}
					disabled={disabled}
					required
				/>
				{errors.startDate && <span className="error">{errors.startDate}</span>}
			</div>

			<div className="form-group">
				<label>Дата выезда:</label>
				<input
					type="date"
					name="endDate"
					value={formData.endDate}
					onChange={handleChange}
					min={formData.startDate || new Date().toISOString().split('T')[0]}
					disabled={disabled}
					required
				/>
				{errors.endDate && <span className="error">{errors.endDate}</span>}
			</div>

			<div className="form-group">
				<label>Количество гостей:</label>
				<input
					type="number"
					name="guests"
					min="1"
					max="4"
					value={formData.guests}
					onChange={handleChange}
					disabled={disabled}
				/>
				{errors.guests && <span className="error">{errors.guests}</span>}
			</div>

			<div className="form-group">
				<label>Особые пожелания:</label>
				<textarea
					name="specialRequests"
					value={formData.specialRequests}
					onChange={handleChange}
					disabled={disabled}
					rows="3"
				/>
			</div>

			<Button
				type="submit"
				disabled={disabled}
				className={disabled ? 'disabled-btn' : 'primary-btn'}
			>
				{disabled ? 'Войдите для бронирования' : 'Забронировать номер'}
			</Button>

			{disabled && (
				<p className="auth-notice">
					Для бронирования необходимо <a href="/login">войти</a> или{' '}
					<a href="/register">зарегистрироваться</a>
				</p>
			)}
		</form>
	);
};

export default BookingForm;
