import { getCardTitleContent } from "../utils";
import { getCardItemsContent } from "../utils";

export default class UserAddress {
    constructor({ street, suite, city, zipcode, geo }) {
        this._street = street;
        this._suite = suite;
        this._city = city;
        this._zipcode = zipcode;
        this._geo = geo;
    }

    getContent() {
        const addressFields = [
            { field: 'City', icon: 'map-pin', textContent: this._city },
            { field: 'Street', icon: 'street-view', textContent: `${this._street}, ${this._suite}` },
            { field: 'Zipcode', icon: 'tag', textContent: this._zipcode },
            {
                field: 'Geo',
                icon: 'location-arrow',
                textContent: `
                    <span class="card-info"><b>Lat:</b> ${this._geo.lat}</span>
                    <span class="card-info"><b>Lng:</b> ${this._geo.lng}</span>
                `
            }
        ];

        return `
            ${getCardTitleContent('Address', 'map-marker')}
            ${getCardItemsContent(addressFields)}
        `;
    }
}
