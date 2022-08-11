import {toast} from 'react-toastify';

import {ACCESSTOKEN, http} from '../../axios/index';
import {
    checkTokenURL,
    getAllProjectURL,
    getProjectDetailURL,
    registerURL,
    signInURL,
    updateProjectURL,
    deleteProjectURL,
    createTaskURL,
    getTaskDetailURL,
    assignUserProjectURL,
    getUserAddProjectURL,
    updateTaskURL,
    removeTaskURL,
    removeUserFromProjectURL,
    getAllUsersManagementURL,
    deleteUserManageURL,
} from '../../axios/apiURL';

import {registerUserSuccess, registerUserFailure, loginSuccess, loginFailure} from '../reducer/userSlice';

import {getProductDetailSuccess, getProjectDetailFailure, createTaskProjectDetail, deleteTaskProjectDetail} from '../reducer/projectDetailSlice';

import {getAllProject, deleteProject} from '../reducer/projectSlice';
import {closeModal} from '../reducer/modalSlice';
import {updateTaskDetail} from '../reducer/taskSlice';

// **** THUNK ****
// THUNK: User Registration
export const registerThunk = (userInfo, onClick) => {
    return async (dispatch) => {
        try {
            const reponse = await http.post(registerURL, userInfo);
            const {content} = reponse.data;
            const {email} = content;
            dispatch(registerUserSuccess(email));
            toast.success('Register Successfully', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
            onClick();

        } catch (err) {
            dispatch(registerUserFailure());
            toast.error('Cannot Register!', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        };
    };
};

// THUNK: User Log In
export const loginThunk = (userInfo, onClick) => {
    return async (dispatch) => {
        try {
            const response = await http.post(signInURL, userInfo);
            const {content} = response.data;
            localStorage.setItem(ACCESSTOKEN, JSON.stringify(content));
            dispatch(loginSuccess(content));
            toast.success('Login Successfully', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
            navigate('/');

        } catch (error) {
            dispatch(loginFailure());
            toast.error('Mail Or Password Is Not Correct!', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        };
    };
};

// Login Verification
export const checkTokenThunk = (userData) => {
    return async (dispatch) => {
        try {
            await http.post(checkTokenURL);
        } catch (error) {
            if (err.response?.data?.message === 'Đăng nhập thành công!') {
                dispatch(loginSuccess(userData));
            } else {localStorage.removeItem(ACCESSTOKEN);}
        };
    };
};

// THUNK: Get Project Details
export const getProjectDetailThunk = (projectID) => {
    return async (dispatch) => {
        try {
            const response = await http.get(getProjectDetailURL + `?id=${projectID}`);
            dispatch(getProductDetailSuccess(response.data.content));
        } catch (error) {
            dispatch(getProjectDetailFailure());
            toast.error(error.response.data.message, {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        }
    };
};

// THUNK: Create Task
export const createTaskThunk = (taskInfo) => {
    return async (dispatch) => {
        try {
            const response = await http.post(createTaskURL, taskInfo);
            const getTaskDetail = await http.get(`${getTaskDetailURL}?taskId=${response.data.content.taskId}`);
            dispatch(createTaskProjectDetail(getTaskDetail.data.content));
            dispatch(closeModal());
            toast.success('Create Task Successfully', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error(error.response.data.content, {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        }
    }
};

// THUNK: Update Task Detail
export const updateTaskDetailThunk = (taskInfo, actions) => {
    return async (dispatch) => {
        try {
            const response = await http.post(`${updateTaskURL}`, taskInfo);
            const getTaskDetail = await http.get(`${updateTaskURL}?taskId=${response.data.content.taskId}`);
            dispatch(actions(getTaskDetail.data.content));
            dispatch(updateTaskDetail(getTaskDetail.data.content));
        } catch (error) {
            toast.error('Cannot Update Detail!');
        }
    }
};

// THUNK: Delete Task Detail
export const deleteTaskDetailThunk = (taskId, statusId, setVisibleModal) => {
    return async (dispatch) => {
        try {
            await http.delete(`${removeTaskURL}?taskId=${taskId}`);
            dispatch(deleteTaskProjectDetail({taskId, statusId}));
            setVisibleModal(false);
            toast.success('Delete Task Detail Successfully!')
        } catch (error) {
            toast.error('Cannot Delete Task!');
        }
    };
};


// **** ACTION ****
// ACTION: Get Project List
export const getListProjectAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(getAllProjectURL);
            const action = getAllProjectURL(result.data.content);
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    };
};

// ACTION: Update Project
export const updateProjectAction = (projectID) => {
    return async (dispatch) => {
        try {
            const result = await http.put(updateProjectURL + `?projectId=${projectID}`);
            dispatch({type: 'UPDATE_PROJECT', data: result.data.content});
        } catch (error) {
            toast.error('Cannot Update! Try Again Later!', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        }
    };
};

// ACTION: Delete Project
export const deleteProjectAction = (projectID) => {
    return async (dispatch) => {
        try {
            await http.delete(`${deleteProjectURL}?projectId=${projectID}`);
            const action = deleteProject(projectID);
            dispatch(action);
            toast.success('Successfully Delete Project', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Cannot Delete! Try Again Later!', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            });
        }
    }
};

// ACTION: Add User To Project
export const getUserAction = (user) => {
    return async (dispatch) => {
        const result = await http.get(`${getUserAddProjectURL}?keyword=${user}`);
        dispatch({type: 'ADD_SEARCH_USER', user: result.data.content});
        try {
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            })
        }
    };
};

// ACTION: Add User To User Management
export const getAllUserAction = () => {
    return async (dispatch) => {
        try {
            const result = await http.get(getAllUsersManagementURL);
            dispatch({type: 'GET_ALL_USER', user: result.data.content});
        } catch (error) {
            toast.error('Cannot Load User', {utoClose: 2000});
        }
    };
};

// ACTION: Delete User From User Management
export const deleteUserManageAction = (userId) => {
    return async (dispatch) => {
        try {
            await http.delete(`${deleteUserManageURL}?id=${userId}`);
            dispatch({type: 'DELETE_USER', userId: userId});
        } catch (error) {
            toast.success('Delete User Successfully', {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            })
        }
    };
};

// ACTION: Assign User To Project
export const assignUserAction = (userInfo) => {
    return async (dispatch) => {
        try {
            await http.post(assignUserProjectURL, userInfo);
            const action = getListProjectAction();
            dispatch(action);
        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top',
                autoClose: 2000,
                closeonClick: true,
                pauseonHover: true,
                draggable: true,
                hideProgressbar: false,
                progress: undefined,
            })
        }
    };
};

// ACTION: Remove User From Project
export const removeUserFromProjectAction = (userInfo) => {
    return async (dispatch) => {
        try {
            await http.post(removeUserFromProjectURL, userInfo);
            const action = getListProjectAction();
            dispatch(action);
        } catch (error) {
            toast.error('Cannot Remove User From This Project!', {autoClose: 2000});
        }
    };
};






