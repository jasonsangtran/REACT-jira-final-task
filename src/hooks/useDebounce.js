import {useEffect, useState} from "react";

export const useDebounce = (initializeValue = '', delay = 2000) => {
    const [debounceValue, setDebounceValue] = useState(initializeValue);
    useEffect(() => {
        const timer = setTimeout(() => {setDebounceValue(initializeValue)}, delay);
        return () => {clearTimeout(timer)};
    }, [delay, initializeValue]);

    return debounceValue;
};