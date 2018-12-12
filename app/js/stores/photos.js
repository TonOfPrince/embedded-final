import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData} from '../utils/fetch';
import moment from 'moment';

export class PhotosStore {
    constructor({routingStore}) {
        extendObservable(this, {
            city: "",
            temperature: "",
            file: "",
            isLoading: false,
            getWeather: action('get weather', id => {
                this.isLoading = true;
                return fetchData(`/api/weather`)
                    .then(temperature => {
                        this.temperature =  temperature;
                    });
            }),
            setCity: action('set city', () => {
                return postData('/api/weather', {
                    city: this.city.title,
                })
                    .then(city => {});
            }),
            addFile: action('add file', e => {
                this.file = e.target.files[0];
            }),
            uploadFile: action('upload file', e => {
                const data = new FormData();
                data.append('file', this.file);
                data.append('filename', "test");

                fetch('/api/photo', {
                  method: 'POST',
                  body: data,
                }).then((response) => {

                });
            }),
        });
    }
}
