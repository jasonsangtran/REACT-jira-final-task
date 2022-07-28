import {Layout, Menu} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UnorderedListOutlined,
    FolderAddOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import React, {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation, Outlet} from 'react-router-dom';

import {ACCESSTOKEN} from '../../axios';
import {logOut} from '../../redux/reducer/userSlice';
import {getUserInfo, getViewport} from '../../redux/selector';

const {Header, Sider, Content} = Layout;

const LayoutMain = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [welcomeText, setWelcomeText] = useState('Hello, Welcome!');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const viewPort = useSelector(getViewport);
    const {width} = viewPort.data;
    const {avatar, name} = useSelector(getUserInfo);

    const handleSignOut = useCallback(() => {
        dispatch(logOut());
        localStorage.removeItem(ACCESSTOKEN);
    },[dispatch]);

    // NOT FINISHED
    
}







