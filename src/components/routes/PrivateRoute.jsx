import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
	const { isAuth } = useSelector((state) => state.auth); // Получаем состояние из Redux
	return isAuth ? children : <Navigate to="/login" />;
}
