import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
	const { currentUser } = useAuth();

	// Проверяем, что пользователь авторизован и является админом
	if (!currentUser || currentUser.role !== 'admin') {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default AdminRoute;
