import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Простая валидация
		if (!formData.name || !formData.email || !formData.password) {
			setError('Все поля обязательны для заполнения');
			return;
		}

		// Получаем существующих пользователей
		const users = JSON.parse(localStorage.getItem('users')) || [];

		// Проверяем, не занят ли email
		if (users.some((user) => user.email === formData.email)) {
			setError('Пользователь с таким email уже существует');
			return;
		}

		// Добавляем нового пользователя
		const newUser = {
			id: Date.now(),
			...formData,
		};

		localStorage.setItem('users', JSON.stringify([...users, newUser]));
		navigate('/login');
	};

	return (
		<div className="auth-form">
			<h2>Регистрация</h2>
			{error && <p className="error">{error}</p>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Имя:</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label>Пароль:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};

export default RegisterPage;
