import { authConstants } from '../constants/auth.constants';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();
const initialState = authService.signedIn() ?
    {
        signedIn: true,
        userId: authService.getUserId(),
        email: authService.getEmail()
    }
    :
    {
        signedIn: false,
        userId: null,
        email: null
    };

initialState.showSignOutPopup = false;
initialState.loginUserDoesNotExist = false;
initialState.registerUserExists = false;

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.SIGN_IN_SUCCESS:
        case authConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                signedIn: true,
                email: action.email,
                userId: action.userId
            };
        case authConstants.SIGN_OUT:
        case authConstants.TOKEN_EXPIRED:
            return {
                ...state,
                signedIn: false,
                email: null,
                userId: null,
                showSignOutPopup: false
            };
        case authConstants.TOGGLE_SIGN_OUT_POPUP:
            return {
                ...state,
                showSignOutPopup: !state.showSignOutPopup
            };
        case authConstants.SET_LOGIN_USER_DOES_NOT_EXIST_FLAG_AS_FALSE:
            return {
                ...state,
                loginUserDoesNotExist: false
            };
        case authConstants.SET_LOGIN_USER_DOES_NOT_EXIST_FLAG_AS_TRUE:
            return {
                ...state,
                loginUserDoesNotExist: true
            };
        case authConstants.SET_REGISTER_USER_EXISTS_FLAG_AS_FALSE:
            return {
                ...state,
                registerUserExists: false
            };
        case authConstants.SET_REGISTER_USER_EXISTS_FLAG_AS_TRUE:
            return {
                ...state,
                registerUserExists: true
            };
        default:
            return state;
    }
}