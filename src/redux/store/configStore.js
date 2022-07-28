import {configureStore} from "@reduxjs/toolkit";

import userReducers from '../reducer/userSlice';
import {userSearchReducer} from '../reducer/userSearchSlice';

import projectReducer from '../reducer/projectSlice';
import projectDetailReducer from '../reducer/projectDetailSlice';
import {projectEditReducer} from '../reducer/projectEditSlice';

import modalReducer from '../reducer/modalSlice';
import taskReducer from '../reducer/taskSlice';
import viewPortReducer from '../reducer/viewPortSlice';

export const store = configureStore({
    reducer: {
        user: userReducers,
        userSearch: userSearchReducer,
        project: projectReducer,
        projectDetail: projectDetailReducer,
        projectEdit: projectEditReducer,
        taskDetail: taskReducer,
        modal: modalReducer,
        viewPort: viewPortReducer,
    }
});


