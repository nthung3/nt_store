import { RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getProfile, Login } from '../services/auth';

const accessToken = localStorage.getItem('token');

export const UseAuthentication = () => {
    const dispatch = useDispatch();

    const resultAccount = useSelector((state: RootState) => state.auth);
    const { token, loading, result } = resultAccount;
    // dispatch api
    const handlePostLogin = (data, navigate) => {
        dispatch(Login(data, navigate));
    };
    // const handlePostRegister = (data) => dispatch(signUp(data));
    // const handleOnLogOut = React.useCallback(
    //     () => token && dispatch(onLogOutRemoveData()) && dispatch(postLogout()),
    //     [dispatch, token],
    // );
    const getProfileAPI = React.useCallback(() => accessToken && dispatch(getProfile()), [accessToken]);

    return {
        resultAccount,
        // handleOnLogOut,
        handlePostLogin,
        getProfileAPI,
        // handlePostRegister,
        token,
        loading,
    };
};
