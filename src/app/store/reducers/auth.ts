import { AuthType } from '@/constants/auth';

type Action = {
    type: string;
    payload: any;
};
const initalState = {
    result: {},
    token: '',
    loading: true,
    error: false,
};
export const AuthReducer = (state = initalState, action: Action) => {
    switch (action.type) {
        case AuthType.Login:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.result.role);
            return {
                ...state,
                result: action.payload.result,
                loading: false,
                token: action.payload.token,
                error: false,
            };
        case AuthType.LoginFail:
            return { error: true, message: action.payload, loading: false };
        case AuthType.Signup:
            return action.payload;
        case AuthType.Logout:
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return { ...state, result: {}, token: '' };
        case AuthType.GetProfile:
            return {
                ...state,
                result: action.payload.data,
                loading: false,
                token: action.payload.token,
                error: false,
            };
        case AuthType.GetProfileFail:
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return { ...state, token: '', loading: false, result: {} };
        default:
            return state;
    }
};
