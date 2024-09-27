import UserAddress from "./UserAddress";
import UserCompany from "./UserCompany";
import User from "./User";

export default class UserBuilder {
    constructor(id, name, username, email, phone, website) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
    }

    addAddress(address) {
        this.address = new UserAddress(address);
        return this;
    }

    addCompany(company) {
        this.company = new UserCompany(company);
        return this;
    }

    build() {
        return new User(this);
    }
}
