export default class ApiService {
    constructor(url) {
        this.url = url;
    }

    async fetchData(endpoint) {
        const response = await fetch(`${this.url}/${endpoint}`);
        return await response.json();
    }

    async getUsers() {
        return await this.fetchData('users');
    }
}
