import decode from 'jwt-decode';
import { config } from './../config';

export class AuthService {

    signIn(credentials) {
        return this.fetch(`${config.apiUrl}/api/sign-in`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    signUp(credentials) {
        return this.fetch(`${config.apiUrl}/api/sign-up`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    signedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpiredOrNotDecoded(token);
    }

    isTokenExpiredOrNotDecoded(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        }
        catch (err) {
            return true;
        }
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    signOut() {
        localStorage.removeItem('token');
    }

    getProfile() {
        return decode(this.getToken());
    }

    getUserId() {
        return this.getProfile().userId;
    }

    getEmail() {
        return this.getProfile().email;
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        return fetch(url, {
            headers,
            ...options
        });
    }
}
