import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки состояния из localStorage
const loadState = () => {
	try {
		const serializedState = localStorage.getItem('bookingsState');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		console.warn('Failed to load bookings state from localStorage', e);
		return undefined;
	}
};

// Загружаем начальное состояние
const initialState = loadState() || {
	list: [
		{
			id: 1,
			roomId: 101,
			userEmail: 'guest@example.com',
			checkIn: '2023-07-15',
			checkOut: '2023-07-20',
			guests: 2,
			status: 'confirmed',
		},
	],
	loading: false,
	error: null,
};

const bookingsSlice = createSlice({
	name: 'bookings',
	initialState,
	reducers: {
		addBooking(state, action) {
			state.list.push({
				id: Date.now(),
				createdAt: new Date().toISOString(),
				status: 'confirmed',
				...action.payload,
			});
			localStorage.setItem('bookingsState', JSON.stringify(state));
		},
		cancelBooking(state, action) {
			const index = state.list.findIndex((b) => b.id === action.payload);
			if (index !== -1) {
				state.list[index].status = 'canceled';
				localStorage.setItem('bookingsState', JSON.stringify(state));
			}
		},
		updateBookingStatus(state, action) {
			const booking = state.list.find((b) => b.id === action.payload.id);
			if (booking) {
				booking.status = action.payload.status;
				localStorage.setItem('bookingsState', JSON.stringify(state));
			}
		},
		updateBooking(state, action) {
			const { id, updates } = action.payload;
			const bookingIndex = state.list.findIndex((b) => b.id === id);

			if (bookingIndex !== -1) {
				// Сохраняем неизменяемые поля
				const immutableFields = {
					id: state.list[bookingIndex].id,
					createdAt: state.list[bookingIndex].createdAt,
					userEmail: state.list[bookingIndex].userEmail,
				};

				// Обновляем только разрешенные поля
				state.list[bookingIndex] = {
					...immutableFields,
					...updates,
					status: 'pending', // Сбрасываем статус
				};

				localStorage.setItem('bookingsState', JSON.stringify(state));
			}
		},
		// Инициализация из localStorage
		initBookings(state, action) {
			if (action.payload) {
				return action.payload;
			}
			return state;
		},
	},
});

export const {
	addBooking,
	cancelBooking,
	updateBookingStatus,
	updateBooking,
	initBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
