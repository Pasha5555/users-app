import { getCardTitleContent } from "../utils";
import { getCardItemsContent } from "../utils";

export default class UserCompany {
    constructor({ name, catchPhrase, bs }) {
        this._name = name;
        this._catchPhrase = catchPhrase;
        this._bs = bs;
    }

    getContent() {
        const companyFields = [
            { field: 'Name', icon: 'building', textContent: this._name },
            { field: 'Catchphrase', icon: 'comment', textContent: this._catchPhrase },
            { field: 'BS', icon: 'bullseye', textContent: `<span class="card-info">${this._bs}</span>` }
        ];

        return `
            ${getCardTitleContent('Company', 'suitcase')}
            ${getCardItemsContent(companyFields)}
        `;
    }
}
