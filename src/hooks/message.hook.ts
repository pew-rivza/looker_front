import {useCallback} from "react";
import { toast } from 'react-toastify';

export const useMessage = () => {
    return useCallback((text) => {
        if(text) {
            toast(text);
        }
    }, [])
}