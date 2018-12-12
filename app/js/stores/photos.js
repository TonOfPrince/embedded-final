import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData, deleteData} from '../utils/fetch';
import moment from 'moment';
import _ from 'lodash';

export class PhotosStore {
    constructor({routingStore}) {
        extendObservable(this, {
            photos: [],
            file: "",
            err: "",
            isLoading: false,
            addFile: action('add file', e => {
                this.file = e.target.files[0];
            }),
            uploadFile: action('upload file', e => {
                if (this.photos.length >= 5) {
                    this.err = "Photo limit reached. Please remove a photo to add more.";
                } else if (!this.file) {
                    this.err = "Please select a file to upload.";
                } else if (_.indexOf(this.photos, _.get(this.file, 'name', "")) !== -1) {
                    this.err = "You already have a photo with this name. Please rename file and try again.";
                } else if (this.file) {
                    const data = new FormData();
                    data.append('file', this.file);
                    console.log(this.file.name);

                    fetch('/api/photo', {
                      method: 'POST',
                      body: data,
                    }).then(response => response.json())
                        .then(photos => {
                            console.log(photos);
                            this.photos = photos;
                            this.file = "";
                            this.err = "";
                        })
                        .catch(err => this.err = "Problem uploading file.");
                }
            }),
            getPhotos: action("get photo list", () => {
                fetchData('/api/photos')
                    .then(photos => {
                        this.photos = photos;
                        this.err = "";
                        console.log(photos);
                    });
            }),
            removePhoto: action("remove photo", photo => {
                deleteData(`/api/photo/${photo}`)
                    .then(photos => {
                        this.photos = photos;
                        this.err = "";
                        console.log(photos);
                    })
                    .catch(err => this.err = "Problem removing file.");
            })
        });
    }
}
