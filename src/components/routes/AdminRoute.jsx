import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminRoute({ children }) {
	const { isAuth, user } = useSelector((state) => state.auth);
	return isAuth && user.role === 'admin' ? children : <Navigate to="/" />;
}
