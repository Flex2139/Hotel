import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '', // 1. Добавляем новое поле
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Простая валидация (обновленная)
		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			setError('Все поля обязательны для заполнения');
			return;
		}

		// 3. Проверка совпадения паролей
		if (formData.password !== formData.confirmPassword) {
			setError('Пароли не совпадают');
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

		// Удаляем confirmPassword перед сохранением
		delete newUser.confirmPassword;

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

				{/* 2. Добавляем поле подтверждения пароля */}
				<div className="form-group">
					<label>Подтвердите пароль:</label>
					<input
						type="password"
						name="confirmPassword" // имя должно совпадать с именем в состоянии
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
				</div>

				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};

export default RegisterPage;
