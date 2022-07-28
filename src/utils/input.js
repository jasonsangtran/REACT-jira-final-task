import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import {getViewport} from '../redux/selector';

const Input = ({defaultValue, register, registerName, errors, errorsMessage, id, labelName, placeholder, type, disabled}) => {
    const viewPort = useSelector(getViewport);
    const {width} = viewPort.data;
    return (
        <div className="text-field" style={{width: '100%'}}>
            <label htmlFor={id} style={{fontSize: width < 1023 && '10px'}}>
                {labelName}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue || ''}
                {...register(registerName)}
                autocomplete='off'
            >
            </input>
            {errors && (<span className="text-field-error">{errorsMessage}</span>)}
        </div>
    )
};

export default memo(Input);

