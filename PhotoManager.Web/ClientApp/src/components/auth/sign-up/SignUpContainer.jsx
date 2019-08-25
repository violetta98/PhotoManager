import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Validation } from '../../../helpers/validation';
import { SignUpComponent } from './SignUpComponent';
import * as authActions from '../../../actions/auth.actions';

class SignUpContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            validationMessages: {
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            showPassword: false,
            showPasswordConfirmation: false,
            submitted: false
        };

        this.onChangeField = this.onChangeField.bind(this);
        this.onClickPasswordEye = this.onClickPasswordEye.bind(this);
        this.onClickPasswordConfirmationEye = this.onClickPasswordConfirmationEye.bind(this);
        this.onClickSignUp = this.onClickSignUp.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    onChangeField(e) {
        const field = e.target.name;

        const credentials = this.state.credentials;
        credentials[field] = e.target.value;

        const validationMessages = this.state.validationMessages;
        validationMessages[field] = this.getValidationMessage(field, credentials[field], this.state.submitted)

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

    onClickPasswordConfirmationEye() {
        this.setState({
            showPasswordConfirmation: !this.state.showPasswordConfirmation
        });
    }

    onClickSignUp() {
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
            this.props.actions.signUp(this.state.credentials);
        }
    }

    onEnterKeyPress(e) {
        if (e.key === 'Enter') {
            this.onClickSignUp();
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
            case 'passwordConfirmation':
                return Validation.getPasswordConfirmationValidationMessage(credential, this.state.credentials.password);
        }
    }

    render() {
        return (
            <SignUpComponent
                credentials={this.state.credentials}
                validationMessages={this.state.validationMessages}
                showPassword={this.state.showPassword}
                showPasswordConfirmation={this.state.showPasswordConfirmation}
                registerUserExists={this.props.registerUserExists}
                onEnterKeyPress={this.onEnterKeyPress}
                onClickPasswordEye={this.onClickPasswordEye}
                onClickPasswordConfirmationEye={this.onClickPasswordConfirmationEye}
                onChangeField={this.onChangeField}
                onClickSignUp={this.onClickSignUp}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        registerUserExists: state.auth.registerUserExists
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);