import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
		},
		cancelBooking(state, action) {
			const index = state.list.findIndex((b) => b.id === action.payload);
			if (index !== -1) {
				state.list[index].status = 'canceled';
			}
		},
		updateBookingStatus(state, action) {
			const booking = state.list.find((b) => b.id === action.payload.id);
			if (booking) booking.status = action.payload.status;
		},
	},
});

export const { addBooking, cancelBooking, updateBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
