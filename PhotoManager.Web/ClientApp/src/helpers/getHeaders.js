import { AuthService } from '../services/auth.service';

export const getHeaders = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let authService = new AuthService();

    if (authService.signedIn()) {
        headers['Authorization'] = 'Bearer ' + authService.getToken();
    }

    return headers;
}