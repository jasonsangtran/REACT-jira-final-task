import React, {memo} from "react";

const Select = ({register, registerName, id, name, children, defaultValue, style}) => {
    return (
        <div className="selectCategory">
            <select
                className="selectCategory__select"
                id={id}
                name={name}
                defaultValue={defaultValue}
                {...register(registerName)}
            >
                {children}
            </select>
        </div>
    );
};

export default memo(Select);