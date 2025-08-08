import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(function () {
		const user = JSON.parse(localStorage.getItem('currentUser'));
		setCurrentUser(user);
		setLoading(false);
	}, []);

	function login(user) {
		localStorage.setItem('currentUser', JSON.stringify(user));
		setCurrentUser(user);
	}

	function logout() {
		localStorage.removeItem('currentUser');
		setCurrentUser(null);
	}

	const value = {
		currentUser,
		login,
		logout,
		loading,
	};

	return React.createElement(AuthContext.Provider, { value: value }, children);
}

export function useAuth() {
	return useContext(AuthContext);
}
