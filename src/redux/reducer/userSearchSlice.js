const stateDefault = {
    userSearch: [],
    userManage: [],
    editUser: {
        name: '', id: '', phone: '', email: '',
    }
};

export const userSearchReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_USER': {
            const users = {...state};
            users.userSearch = action.user;
            return {...users};
        }
        case 'GET_USER': {
            const users = {...state};
            users.userManage = action.user;
            return {...users};
        }
        case 'DELETE_USER': {
            const users = {...state};
            users.userManage = [...state.userManage.filter(user => user.id !== action.id)];
            return {...users};
        }
        case 'EDIT_USER': {
            const currentUser = {...state};
            currentUser.editUser = action.data.user;
            return {...currentUser};
        }
        default: return state;
    }
};


