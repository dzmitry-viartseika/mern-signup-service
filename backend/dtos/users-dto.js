module.exports = class UsersDto {
    email;
    id;
    avatar;
    firstName;
    lastName;
    phoneNumber;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.avatar = model.avatar;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.phoneNumber = model.phoneNumber;
    }
}
