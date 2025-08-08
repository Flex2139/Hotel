import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('hotelUser'));
const storedToken = localStorage.getItem('hotelToken');

const initialState = {
	user: storedUser || null,
	token: storedToken || null,
	isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;

			// Сохраняем в localStorage
			localStorage.setItem('hotelUser', JSON.stringify(action.payload.user));
			localStorage.setItem('hotelToken', action.payload.token);
		},
		logoutSuccess: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;

			// Очищаем localStorage
			localStorage.removeItem('hotelUser');
			localStorage.removeItem('hotelToken');
		},
		registerSuccess: (state, action) => {
			// Можно сразу авторизовать после регистрации
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;

			localStorage.setItem('hotelUser', JSON.stringify(action.payload.user));
			localStorage.setItem('hotelToken', action.payload.token);
		},
	},
});

export const { loginSuccess, logoutSuccess, registerSuccess } = authSlice.actions;
export default authSlice.reducer;
