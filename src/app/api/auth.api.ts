import { AuthData } from '@/core/interfaces/auth';
import HTTPS from './base';

export class Auth {
    static Signin(data: AuthData) {
        return HTTPS.post('user/login', data);
    }
    static Signup(data: AuthData) {
        return HTTPS.post('user/signup', data);
    }
    static GetProfile() {
        return HTTPS.get('user/getprofile');
    }
}
