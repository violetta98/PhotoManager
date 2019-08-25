export const config = {
    apiUrl: 'https://localhost:44333',
    albumsTagsInput: {
        minQueryLength: 0,
        placeholder: 'Add to albums'
    },
    photo: {
        maxFiles: 5,
        acceptedFileTypes: ['image/*'],
        maxFileSize: 5000000,
        imageValidateSizeMaxWidth: 10000,
        imageValidateSizeMaxHeight: 10000,
        name: {
            maxLength: 25
        },
        description: {
            maxLength: 500
        }
    },
    password: {
        minLength: 6,
        maxLength: 30
    },
    gallery: {
        pageSize: 12,
        pageRangeDisplayed: 5
    },
    albums: {
        pageSize: 9,
        pageRangeDisplayed: 5
    },
    album: {
        name: {
            maxLength: 25
        },
        description: {
            maxLength: 500
        },
        coverPath: 'https://res.cloudinary.com/daxuhqfm2/image/upload/v1554233275/default_album_cover.png'
    },
    albumPhotos: {
        pageSize: 12,
        pageRangeDisplayed: 5
    },
    proxyUrl: 'https://cors-anywhere.herokuapp.com/'
};