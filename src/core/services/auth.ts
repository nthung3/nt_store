import { useNavigate } from 'react-router-dom';
import { Auth } from '@/app/api/auth.api';
import { RootState } from '@/app/store';
import { AuthType } from '@/constants/auth';

import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const Login = (data: any, navigate): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Auth.Signin(data);

            await dispatch({ type: AuthType.Login, payload: res });
            if (res.result.role === 0) return navigate('/admin');
        } catch (error) {
            dispatch({
                type: AuthType.LoginFail,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
            console.log(error);
        }
    };
};

export const Logout = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: AuthType.Logout });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getProfile = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await Auth.GetProfile();
            dispatch({ type: AuthType.GetProfile, payload: res });
        } catch (error) {
            dispatch({ type: AuthType.GetProfileFail });
            console.log(error);
        }
    };
};
