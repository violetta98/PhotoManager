import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input } from '../../controls/Input';
import { Button } from '../../controls/Button';
import { Form } from '../../controls/Form';

export class SignInComponent extends Component {
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
                {this.props.loginUserDoesNotExist
                    ? <div align="center" className="red">
                        <br />Sorry, but the user with these email and password does not exist!<br />
                      </div>
                    : null
                }
                <Button
                    name={'Sign in'}
                    onClick={this.props.onClickSignIn}
                />
                <div className="text-center p-t-75">
                    <span className="txt1">Don’t have an account? &nbsp;</span>
                    <Link to={'/sign-up'} className="txt2">Sign Up</Link>
                </div>
            </Form>
        );
    }
}