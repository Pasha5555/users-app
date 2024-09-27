export default class FilterManager {
    constructor(users) {
        this.users = users;
        this._filterField = 'name';
        this._filterQuery = '';
    }

    setFilterField(type) {
        this._filterField = type;
    }

    setFilterQuery(input) {
        this._filterQuery = input.toLowerCase();
    }

    getFilteredUsers() {
        return this.users.filter(user => {
            const valueByFilterMap = {
                name: user._name,
                username: user._username,
                email: user._email,
                phone: user._phone,
                website: user._website,
                company: user._company._name,
                catchphrase: user._company._catchPhrase,
                bs: user._company._bs,
                city: user._address._city,
                street: `${user._address._street} ${user._address._suite}`,
                zipcode: user._address._zipcode,
                geo: `${user._address._geo.lat} ${user._address._geo.lng}`
            }

            return valueByFilterMap[this._filterField].toLowerCase().includes(this._filterQuery);
        });
    }
}
