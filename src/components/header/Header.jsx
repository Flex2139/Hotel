// src/components/Header/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import Button from '../Button/Button'; // Предполагаем, что у вас есть компонент Button

export default function Header() {
	const navigate = useNavigate();
	const { isAuth } = useAuth(); // Хук для проверки авторизации

	return (
		<header className="flex justify-between items-center p-4 border-b">
			{/* Кнопка "Назад" */}
			<Button
				onClick={() => navigate(-1)}
				className="bg-gray-100 px-3 py-1 rounded"
			>
				Назад
			</Button>

			{/* Логотип (центр) */}
			<Link to="/" className="text-xl font-bold">
				Жемчужина Байкала
			</Link>

			{/* Кнопка входа */}
			<Link
				to="/login"
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				{isAuth ? 'Личный кабинет' : 'Вход / Регистрация'}
			</Link>
		</header>
	);
}
