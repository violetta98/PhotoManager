import validator from 'validator';

import { config } from './../config';

export class Validation {

    static IsTagOrScript(value) {
        return value.match(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/);
    }

    static getEmailValidationMessage(email) {
        let emailValidationMessage = '';

        if (validator.isEmpty(email.trim())) {
            emailValidationMessage = 'Please input email!';
        }
        else if (!validator.isEmail(email)) {
            emailValidationMessage = 'Please input valid email!';
        }

        return emailValidationMessage;
    }

    static getPasswordValidationMessage(password) {
        let passwordValidationMessage = '';

        if (validator.isEmpty(password.trim())) {
            passwordValidationMessage = 'Please input password!';
        }
        else if (!validator.isLength(password, { min: config.password.minLength })) {
            passwordValidationMessage = `Password should be at least ${config.password.minLength} symbols!`;
        }
        else if (!validator.isLength(password, { max: config.password.maxLength })) {
            passwordValidationMessage = `Password should be no more ${config.password.maxLength} symbols!`;
        }
        else if (Validation.IsTagOrScript(password)) {
            passwordValidationMessage = 'Password shouldn\'t be a tag or script!';
        }

        return passwordValidationMessage;
    }

    static getPasswordConfirmationValidationMessage(passwordConfirmation, password) {
        let passwordConfirmationValidationMessage = '';

        if (validator.isEmpty(passwordConfirmation.trim())) {
            passwordConfirmationValidationMessage = 'Please input password confirmation!';
        }
        else if (!validator.equals(passwordConfirmation, password)) {
            passwordConfirmationValidationMessage = 'Password doesn\'t match confirmation!'
        }

        return passwordConfirmationValidationMessage;
    }

    static getPhotoNameValidationMessage(photoName) {
        let photoNameValidationMessage = '';

        if (validator.isEmpty(photoName.trim())) {
            photoNameValidationMessage = 'Please input name!';
        }
        else if (!validator.isLength(photoName, { max: config.photo.name.maxLength })) {
            photoNameValidationMessage = `Name should be no more ${config.photo.name.maxLength} symbols!`;
        }
        else if (Validation.IsTagOrScript(photoName)) {
            photoNameValidationMessage = 'Name shouldn\'t be a tag or script!';
        }

        return photoNameValidationMessage;
    }

    static getPhotoDescriptionValidationMessage(photoDescription) {
        let photoDescriptionValidationMessage = '';

        if (Validation.IsTagOrScript(photoDescription)) {
            photoDescriptionValidationMessage = 'Description shouldn\'t be a tag or script!';
        }
        else if (!validator.isLength(photoDescription, { max: config.photo.description.maxLength })) {
            photoDescriptionValidationMessage = `Description should be no more ${config.photo.description.maxLength} symbols!`;
        }

        return photoDescriptionValidationMessage;
    }

    static getAlbumNameValidationMessage(albumName) {
        let albumNameValidationMessage = '';

        if (validator.isEmpty(albumName.trim())) {
            albumNameValidationMessage = 'Please input name!';
        }
        else if (!validator.isLength(albumName, { max: config.album.name.maxLength })) {
            albumNameValidationMessage = `Name should be no more ${config.album.name.maxLength} symbols!`;
        }
        else if (Validation.IsTagOrScript(albumName)) {
            albumNameValidationMessage = 'Name shouldn\'t be a tag or script!';
        }

        return albumNameValidationMessage;
    }

    static getAlbumDescriptionValidationMessage(albumDescription) {
        let albumDescriptionValidationMessage = '';

        if (Validation.IsTagOrScript(albumDescription)) {
            albumDescriptionValidationMessage = 'Description shouldn\'t be a tag or script!';
        }
        else if (!validator.isLength(albumDescription, { max: config.album.description.maxLength })) {
            albumDescriptionValidationMessage = `Description should be no more ${config.photo.description.maxLength} symbols!`;
        }

        return albumDescriptionValidationMessage;
    }
}