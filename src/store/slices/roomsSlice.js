import { createSlice } from '@reduxjs/toolkit';
import { roomsData } from '../../data/rooms-data';

const initialState = {
	data: roomsData,
	loading: false,
	error: null,
};

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		addRoom(state, action) {
			state.data.push(action.payload);
		},
		deleteRoom(state, action) {
			state.data = state.data.filter((room) => room.id !== action.payload);
		},
		updateRoom(state, action) {
			const index = state.data.findIndex((room) => room.id === action.payload.id);
			if (index !== -1) {
				state.data[index] = { ...state.data[index], ...action.payload.updates };
			}
		},
	},
});

export const { addRoom, deleteRoom, updateRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
