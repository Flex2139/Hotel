import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [formData, setFormData] = useState({
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
		if (!formData.email || !formData.password) {
			setError('Все поля обязательны для заполнения');
			return;
		}

		// Получаем пользователей
		const users = JSON.parse(localStorage.getItem('users')) || [];

		// Ищем пользователя
		const user = users.find(
			(u) => u.email === formData.email && u.password === formData.password,
		);

		if (user) {
			// Сохраняем сессию
			localStorage.setItem('currentUser', JSON.stringify(user));
			navigate('/');
		} else {
			setError('Неверный email или пароль');
		}
	};

	return (
		<div className="auth-form">
			<h2>Вход</h2>
			{error && <p className="error">{error}</p>}

			<form onSubmit={handleSubmit}>
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

				<button type="submit">Войти</button>
			</form>

			<p>
				Нет аккаунта?{' '}
				<button onClick={() => navigate('/register')}>Зарегистрироваться</button>
			</p>
		</div>
	);
};

export default LoginPage;
