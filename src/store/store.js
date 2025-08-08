import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roomsReducer from './slices/roomsSlice';
import bookingsReducer from './slices/bookingsSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		rooms: roomsReducer,
		bookings: bookingsReducer,
	},
});
