import { getCardItemsContent } from "../utils";

export default class User {
    constructor(builder) {
        this._id = builder.id;
        this._name = builder.name;
        this._username = builder.username;
        this._email = builder.email;
        this._phone = builder.phone;
        this._website = builder.website;
        this._address = builder.address;
        this._company = builder.company;
    }

    createUserCard() {
        const userCard = document.createElement('div');
        const userFields = [
            {
                field: 'Email',
                icon: 'envelope',
                textContent: `<a href="mailto:${this._email}" class="card-link">${this._email}</a>`
            },
            { field: 'Phone', icon: 'phone', textContent: this._phone },
            {
                field: 'Website',
                icon: 'globe',
                textContent: `<a href="https://${this._website}" class="card-link" target="_blank">${this._website}</a>`
            }
        ];

        userCard.className = 'user-card';
        userCard.key = this._id;
        userCard.innerHTML = `
            <h3><i class="fa fa-user-circle-o"></i> <b>${this._name}</b> (${this._username})</h3>
            ${getCardItemsContent(userFields)}
            ${this._company.getContent()}
            ${this._address.getContent()}
        `;

        return userCard;
    }
}
