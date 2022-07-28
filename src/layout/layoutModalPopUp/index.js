import React, {memo} from 'react';
import {Modal} from 'antd';

const LayOutModalPopUp = ({title, visible, setVisible, children}) => {
    return (
        <div>
            <Modal
                title={title}
                visible={visible}
                onCancel={() => setVisible(false)}
                centered
                width={1100}
                cancelButtonProps={{style: {display: 'none'}}}
                okButtonProps={{style: {display: 'none'}}}
            >
                {children}
            </Modal>
        </div>
    )
};

export default LayOutModalPopUp;