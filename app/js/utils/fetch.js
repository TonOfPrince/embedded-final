import 'whatwg-fetch';

let buildUrl = (url, params = {}) => {
    if (!_.isEmpty(params)) {
        url += '?';
        url += Object.keys(params).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        }).join('&');
    }
    return url;
}

export const fetchData = (url, params) => {
    url = buildUrl(url, params);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.tokenToStretch}`,
        }
    }).then(response => response.json())
        .catch(err => {return {err}});
}

export const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.tokenToStretch}`,
        },
    }).then(response => response.json())
        .catch(err => console.log(err));
}
