import { useState } from 'react';

export default function useApi() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = async (url, method = 'GET', body = null) => {
		setLoading(true);
		setError(null);

		try {
			const BASE_URL = import.meta.env.VITE_API_URL || '';

			const headers = {};

			if (body) {
				headers['Content-Type'] = 'application/json';
			}

			const token = localStorage.getItem('hotelToken');
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const response = await fetch(`${BASE_URL}${url}`, {
				method,
				headers,
				body: body ? JSON.stringify(body) : null,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Ошибка сервера');
			}

			setLoading(false);
			return data;
		} catch (err) {
			setLoading(false);
			setError(err.message);
			throw err;
		}
	};

	return { request, loading, error };
}
