import React, {memo} from "react";
import {Drawer} from 'antd';

import {useDispatch, useSelector} from "react-redux";
import {closeModal} from '../../redux/reducer/modalSlice';
import {getViewPort, getVisibleModal} from '../../redux/selector';

const LayoutModal = ({children}) => {
    const {visible} = useSelector(getVisibleModal);
    const dispatch = useDispatch();
    const onClose = () => {dispatch(closeModal())};

    const viewPort = useSelector(getViewPort);
    const {width} = viewPort.data;

    return (
        <div>
            <Drawer
                width={width <= 1023 ? "100%" : "720px"}
                bodyStyle={{paddingBottom: 80}}
                style={{zIndex: 100}}
                visible={visible}
                onClose={onClose}
            >
                {children}
            </Drawer>
        </div>
    );
};

export default memo(LayoutModal);