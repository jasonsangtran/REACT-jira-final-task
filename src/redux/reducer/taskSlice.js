import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: {},
    isLoading: false
};

const taskReducer = createSlice({
    name: 'taskDetail',
    initialState,
    reducers: {
        updateTaskDetail (state, action) {
            const {payload} = action;
            state.data = payload;
        }
    }
});

export const {updateTaskDetail} = taskReducer.actions;
export default taskReducer.reducer;