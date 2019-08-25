import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input } from '../../controls/Input';
import { Button } from '../../controls/Button';
import { Form } from '../../controls/Form';

export class SignUpComponent extends Component {
    render() {
        return (
            <Form onEnterKeyPress={this.props.onEnterKeyPress}>
                <span className="form-title p-b-26">Sign in to Photo Manager</span>
                <Input name={'email'}
                    value={this.props.credentials.email}
                    validationMessage={this.props.validationMessages.email}
                    onChange={this.props.onChangeField}
                    placeholder={'Email'}
                />
                <Input name={'password'}
                    value={this.props.credentials.password}
                    validationMessage={this.props.validationMessages.password}
                    onChange={this.props.onChangeField}
                    placeholder={'Password'}
                    showPassword={this.props.showPassword}
                    onClickPasswordEye={this.props.onClickPasswordEye}
                />
                <Input name={'passwordConfirmation'}
                    value={this.props.credentials.passwordConfirmation}
                    validationMessage={this.props.validationMessages.passwordConfirmation}
                    onChange={this.props.onChangeField}
                    placeholder={'Password confirmation'}
                    showPassword={this.props.showPasswordConfirmation}
                    onClickPasswordEye={this.props.onClickPasswordConfirmationEye}
                />
                {this.props.registerUserExists
                    ? <div align="center" className="red">
                        <br />Sorry, but the user with this email already exists!<br />
                    </div>
                    : null
                }
                <Button
                    name={'Sign up'}
                    onClick={this.props.onClickSignUp}
                />
                <div className="text-center p-t-75">
                    <span className="txt1">Already have an account? &nbsp;</span>
                    <Link to={'/sign-in'} className="txt2">Sign In</Link>
                </div>
            </Form>
        );
    }
}