import { config } from './../config';
import { getHeaders } from '../helpers/getHeaders';

export class PhotoService {

    getPhoto(photoId) {
        return fetch(`${config.apiUrl}/api/photos/${photoId}`, {
            method: 'GET',
            headers: getHeaders()
        });
    }

    getPhotosByUserId(userId, pageSize, pageIndex) {
        return fetch(`${config.apiUrl}/api/users/${userId}/photos?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET',
            headers: getHeaders()
        });
    }

    getPhotosByAlbumId(albumId, pageSize, pageIndex) {
        return fetch(`${config.apiUrl}/api/albums/${albumId}/photos?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET',
            headers: getHeaders()
        });
    }

    addPhotos(photos) {
        return fetch(`${config.apiUrl}/api/photos`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(photos)
        });
    }

    editPhoto(photo) {
        return fetch(`${config.apiUrl}/api/photos`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(photo)
        });
    }

    deletePhoto(photoId, albumId) {
        let url = `${config.apiUrl}/api/photos/${photoId}`;
        if (albumId !== null)
            url += `?albumId=${albumId}`;

        return fetch(url, {
            method: 'DELETE',
            headers: getHeaders()
        });
    }
}