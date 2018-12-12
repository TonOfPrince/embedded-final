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
                            this.city = data.city;
                            this.temp = data.temp;
                            this.high = data.tempMax;
                            this.low = data.tempMin;
                            this.description = _.capitalize(data.description);
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
