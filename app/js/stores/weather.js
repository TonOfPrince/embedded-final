import { computed, action, extendObservable } from 'mobx';
import {fetchData, postData} from '../utils/fetch';
import moment from 'moment';

export class WeatherStore {
    constructor({routingStore}) {
        extendObservable(this, {
            city: "",
            description: "",
            newCity: "",
            temp: "",
            high: "",
            low: "",
            err: "",
            // currentArticle: new Article(),
            isLoading: false,
            getWeather: action('get weather', id => {
                // this.isLoading = true;
                return fetchData(`/api/weather`, {city: this.newCity})
                    .then(data => {
                        if (data.err) {
                            this.err = data.err;
                        } else {
                            this.city = _.get(data, '[0].city', '');
                            this.temp = _.get(data, '[0].temp', '');
                            this.high = _.get(data, '[0].tempMax', '');
                            this.low = _.get(data, '[0].tempMin', '');
                            this.description = _.capitalize(_.get(data, '[0].description', ''));
                            this.err = "";
                        }
                    });
            }),
            setCity: action('set city', () => {
                return fetchData(`/api/weather`, {city: this.newCity}, {
                    city: this.city,
                })
                    .then(city => {});
            }),
            setNewCity: action('set new city', city => {this.newCity = city}),
            handleKeyPress: action ('handle key press', e => {
                if (e.key === 'Enter') {
                    this.getWeather(this.newCity);
                    this.newCity = "";
                }
            })
        });
    }
}
