import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Используем наш контекст
import Button from '../button/Button';

export default function Header() {
	const navigate = useNavigate();
	const { currentUser, logout } = useAuth(); // Получаем данные из контекста

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

			{/* Блок авторизации */}
			<div className="flex items-center gap-4">
				{currentUser ? (
					<>
						<span className="text-sm">Привет, {currentUser.name}!</span>
						<Button
							onClick={() => navigate('/profile')}
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
						>
							Личный кабинет
						</Button>
						<Button
							onClick={logout}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Выйти
						</Button>
					</>
				) : (
					<>
						<Button
							onClick={() => navigate('/login')}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Вход
						</Button>
						<Button
							onClick={() => navigate('/register')}
							className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
						>
							Регистрация
						</Button>
					</>
				)}
			</div>
		</header>
	);
}
