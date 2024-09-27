import ApiService from '@components/ApiService';
import UserBuilder from '@components/UserBuilder';
import FilterManager from '@components/FilterManager';
import { debounce } from './utils';
import './styles/styles.css'
import { BASE_URL } from './constants';
import { USER_PROPS } from './constants';

class UsersApp {
    constructor(apiService) {
        this.apiService = apiService;
        this.users = [];
        this.filterManager = null;
        this.userContainer = document.getElementById('user-cards');
        this.loader = document.getElementById('loader');
        this.errorBox = document.getElementById('notification-error');
        this.init();
    }

    async init() {
        this.showLoader(true);
        this.showError(false);
        await this.parseUsers();
        this.filterManager = new FilterManager(this.users);
        this.initFilters();
        this.renderUsers(this.users);
        this.showLoader(false);
    }

    async parseUsers() {
        try {
            const usersData = await this.apiService.getUsers();

            this.users = usersData.map(userData => {
                const { id, name, username, email, phone, website } = userData;
                const builder = new UserBuilder(id, name, username, email, phone, website);
                builder.addAddress(userData.address);
                builder.addCompany(userData.company);

                return builder.build();
            });
        } catch (e) {
            this.showError(true, e.toString());
            setTimeout(() => this.showError(false), 3000);
        }
    }

    renderUsers(users) {
        this.userContainer.innerHTML = '';
        users.forEach(user => {
            const userCard = user.createUserCard();
            this.userContainer.appendChild(userCard);
        });
    }

    initFilters() {
        const filterSelect = document.getElementById('filter-by');
        const filterInput = document.getElementById('filter-input');
        const debouncedFilter = debounce(() => this.showFilteredUsers(), 300);
        const options = USER_PROPS.map((prop) => `<option value=${prop}>${prop[0].toUpperCase() + prop.slice(1)}</option>`).join('');
        filterSelect.innerHTML = options;

        filterSelect.addEventListener('change', ({ target: { value }}) => {
            this.filterManager.setFilterField(value);
            this.showFilteredUsers();
        });
        filterInput.addEventListener('input', ({ target: { value }}) => {
            this.filterManager.setFilterQuery(value.toLowerCase());
            debouncedFilter();
        });
    }

    showFilteredUsers() {
        this.renderUsers(this.filterManager.getFilteredUsers());
    }

    showLoader(show) {
        this.loader.style.display = show ? 'flex' : 'none';
    }

    showError(show, message = 'Something went wrong') {
        this.errorBox.style.display = show ? 'block' : 'none';
        show && (this.errorBox.querySelector('.notification-content').textContent = message);
    }
}

const apiService = new ApiService(BASE_URL);
export default new UsersApp(apiService);
