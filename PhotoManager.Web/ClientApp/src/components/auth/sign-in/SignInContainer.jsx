import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Validation } from '../../../helpers/validation';
import { SignInComponent } from './SignInComponent';
import * as authActions from '../../../actions/auth.actions';

class SignInContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            validationMessages: {
                email: '',
                password: ''
            },
            showPassword: false,
            submitted: false
        };

        this.onChangeField = this.onChangeField.bind(this);
        this.onClickPasswordEye = this.onClickPasswordEye.bind(this);
        this.onClickSignIn = this.onClickSignIn.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    onChangeField(e) {
        const field = e.target.name;

        const credentials = this.state.credentials;
        credentials[field] = e.target.value;

        const validationMessages = this.state.validationMessages;
        validationMessages[field] = this.getValidationMessage(field, credentials[field], this.state.submitted);

        this.setState({
            credentials: credentials,
            validationMessages: validationMessages
        });
    }

    onClickPasswordEye() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    onClickSignIn() {
        let modelIsValid = true;

        const credentials = this.state.credentials;
        const validationMessages = this.state.validationMessages;

        Object.keys(validationMessages).forEach((credentialType) => {
            validationMessages[credentialType] = this.getValidationMessage(credentialType, credentials[credentialType], true);
            modelIsValid = modelIsValid && validationMessages[credentialType] === '';
        });

        this.setState({
            submitted: true,
            validationMessages
        });

        if (modelIsValid) {
            this.props.actions.signIn(this.state.credentials);
        }
    }

    onEnterKeyPress(e) {
        if (e.key === 'Enter') {
            this.onClickSignIn();
        }
    }

    getValidationMessage(credentialType, credential, submitted) {
        if (!submitted) {
            return '';
        }

        switch (credentialType) {
            case 'email':
                return Validation.getEmailValidationMessage(credential);
            case 'password':
                return Validation.getPasswordValidationMessage(credential);
        }
    }

    render() {
        return (
            <SignInComponent
                credentials={this.state.credentials}
                validationMessages={this.state.validationMessages}
                showPassword={this.state.showPassword}
                loginUserDoesNotExist={this.props.loginUserDoesNotExist}
                onEnterKeyPress={this.onEnterKeyPress}
                onClickPasswordEye={this.onClickPasswordEye}
                onChangeField={this.onChangeField}
                onClickSignIn={this.onClickSignIn}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginUserDoesNotExist: state.auth.loginUserDoesNotExist
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);