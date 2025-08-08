import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
	const { currentUser } = useAuth();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
			<div className="bg-white p-6 rounded-lg shadow">
				<p>
					<strong>Имя:</strong> {currentUser?.name}
				</p>
				<p>
					<strong>Email:</strong> {currentUser?.email}
				</p>
				{/* Дополнительная информация пользователя */}
			</div>
		</div>
	);
};

export default ProfilePage;
