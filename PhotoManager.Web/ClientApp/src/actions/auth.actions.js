import { authConstants } from '../constants/auth.constants';
import { AuthService } from '../services/auth.service';
import { history } from '../helpers/history';

const authService = new AuthService();

export const signIn = (credentials) => {
    return (dispatch) => {
        return authService.signIn(credentials)
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {
                        authService.setToken(result);

                        dispatch({
                            type: authConstants.SIGN_IN_SUCCESS,
                            email: authService.getEmail(),
                            userId: authService.getUserId()
                        });

                        dispatch({
                            type: authConstants.SET_LOGIN_USER_DOES_NOT_EXIST_FLAG_AS_FALSE
                        });

                        history.push('/gallery');
                    });
                } else if (response.status === 404) {
                    dispatch({
                        type: authConstants.SET_LOGIN_USER_DOES_NOT_EXIST_FLAG_AS_TRUE
                    });
                }
            });
    };
}

export const signUp = (credentials) => {
    return (dispatch) => {
        return authService.signUp(credentials)
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {
                        authService.setToken(result);

                        dispatch({
                            type: authConstants.SIGN_UP_SUCCESS,
                            email: authService.getEmail(),
                            userId: authService.getUserId()
                        });

                        dispatch({
                            type: authConstants.SET_REGISTER_USER_EXISTS_FLAG_AS_FALSE
                        });

                        history.push('/gallery');
                    });
                } else if (response.status === 409) {
                    dispatch({
                        type: authConstants.SET_REGISTER_USER_EXISTS_FLAG_AS_TRUE
                    });
                }
            });
    };
}

export const toggleSignOutPopup = () => {
    return (dispatch) => {
        dispatch({
            type: authConstants.TOGGLE_SIGN_OUT_POPUP
        });
    };
}

export const signOut = () => {
    return (dispatch) => {
        authService.signOut();
        dispatch({ type: authConstants.SIGN_OUT });
    };
}
