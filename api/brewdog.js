import axios from 'axios';

/**
 * Brewdog API client
 */
export default class BrewdogAPI {

    /**
     * @returns {string}
     * @constructor
     */
    static get ENDPOINT() {
        return "https://api.punkapi.com/v2/beers";
    }

    /**
     * @param page
     * @param perPage
     * @returns {V}
     */
    static getBrewList(page, perPage) {
        return axios.get(BrewdogAPI.ENDPOINT, {
            params: {
                page: page,
                per_page: perPage,
            },
            transformResponse: (data) => {
                return JSON.parse(data);
            },
        });
    }

    /**
     * @param id
     * @returns {V}
     */
    static getBrewDetails(id) {
        return axios.get(`${BrewdogAPI.ENDPOINT}/${id}`, {
            transformResponse: (data) => {
                return JSON.parse(data)[0];
            },
        });
    }

}