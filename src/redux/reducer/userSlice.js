import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email: '',
    isLoading: false,
    isTokenChecked: false,
};

const userReducers = createSlice({
    name: 'user',
    initialState,
    reducers:
    {
        registerUserRequest: (state, action) => {
            return {...state, isLoading: true};
        },
        registerUserSuccess: (state, action) => {
            const {payload} = action;
            return {...state, email: payload, isLoading: false};
        },
        registerUserFailure: (state, action) => {
            return {...state, isLoading: false};
        },
        loginRequest: (state, action) => {
            return {...state, isLoading: true};
        },
        loginSuccess: (state, action) => {
            const {payload} = action;
            return {...state, ...payload, isLoading: false, isTokenChecked: false};
        },
        loginFailure: (state, action) => {
            return {...state, isLoading: false, isTokenChecked: false};
        },
        logOut: (state, action) => {
            return {...initialState, email: state.email};
        },
        checkToken: (state, action) => {
            return {...state, isTokenChecked: true};
        },
    }
});

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logOut,
    checkToken,
} = userReducers.actions;

export default userReducers.reducer;