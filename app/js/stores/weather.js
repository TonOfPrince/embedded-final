import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData} from '../utils/fetch';
import moment from 'moment';

export class WeatherStore {
    constructor({routingStore}) {
        extendObservable(this, {
            city: "",
            temperature: "",
            currentArticle: new Article(),
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
        });
    }
}
