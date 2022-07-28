import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: {},
    isLoading: false,
};

const projectDetailReducer = createSlice({
    name: projectDetail,
    initialState,
    reducers:
    {
        // project
        getProjectDetailRequest (state, action) {
            return {...state, isLoading: true}
        },
        getProductDetailSuccess (state, action) {
            const {payload} = action;
            return {...state, data: {...payload}, isLoading: false}
        },
        getProjectDetailFailure (state, action) {
            return {...state, isLoading: false}
        },

        // task in project
        createTaskProjectDetail (state, action) {
            const {payload} = action;
            let currentTaskLists = state.data.listTask.find(task => task.statusId === payload.statusId);
            currentTaskLists.listTaskDetail.push(payload);
        },
        updateTaskProjectDetail (state, action) {
            const {payload} = action;
            let currentTaskLists = state.data.listTask.find(task => task.statusId === payload.statusId);
            let currentTaskIdx = currentTaskLists.listTaskDetail.findIndex(task => task.taskId === payload.taskId);
            if (currentTaskIdx !== -1) {
                currentTaskLists.listTaskDetail.splice(currentTaskIdx, 1, payload);
            }
        },
        updateStatusTaskProjectDetail (state, action) {
            const {payload} = action;
            let currentTaskArr = [];

            state.data.listTask.forEach(task => {
                currentTaskArr.push({
                    ...task,
                    listTaskDetail: [...task.listTaskDetail.filter(detail => detail.taskId !== payload.taskId)]
                })
            });

            state.data.listTask = currentTaskArr;
            let currentTaskLists = state.data.listTask.find(task => task.statusId === payload.taskId);
            currentTaskLists.listTaskDetail.push(payload);
        },
        deleteTaskProjectDetail (state, action) {
            const {payload} = action;
            let currentTaskLists = state.data.listTask.find(task => task.statusId === payload.statusId);
            let currentTaskIdx = currentTaskLists.listTaskDetail.findIndex(task => task.taskId === payload.taskId);
            if (currentTaskIdx !== -1) currentTaskLists.listTaskDetail.splice(currentTaskIdx, 1);
        }
    }
});

export const
    {
    getProjectDetailRequest,
    getProductDetailSuccess,
    getProjectDetailFailure,

    createTaskProjectDetail,
    updateTaskProjectDetail,
    updateStatusTaskProjectDetail,
    deleteTaskProjectDetail,
    }
    = projectDetailReducer.actions;

export default projectDetailReducer.reducer;