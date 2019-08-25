import { config } from './../config';
import { getHeaders } from '../helpers/getHeaders';

export class AlbumService {

    getAlbum(albumId, pageSize, pageIndex) {
        return fetch(`${config.apiUrl}/api/albums/${albumId}?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET',
            headers: getHeaders()
        });
    }

    getAlbums(userId, pageSize, pageIndex) {
        return fetch(`${config.apiUrl}/api/albums?userId=${userId}&pageSize=${pageSize}&pageIndex=${pageIndex}`, {
            method: 'GET',
            headers: getHeaders()
        });
    }

    getAlbumSuggestions(userId, maxSuggestions, search) {
        let url = `${config.apiUrl}/api/album-suggestions?userId=${userId}&maxSuggestions=${maxSuggestions}`;
        if (search)
            url += `&${search}`;

        return fetch(url, {
            method: 'GET',
            headers: getHeaders()
        });
    }

    addAlbum(album) {
        return fetch(`${config.apiUrl}/api/albums`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(album)
        });
    }

    editAlbum(album) {
        return fetch(`${config.apiUrl}/api/albums`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(album)
        });
    }

    deleteAlbum(albumId) {
        return fetch(`${config.apiUrl}/api/albums/${albumId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
    }
}