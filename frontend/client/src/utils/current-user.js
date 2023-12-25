class CurrentUser {
  static instance = CurrentUser.instance || new CurrentUser();

  static getInstance() {
    if (!CurrentUser.instance) {
      CurrentUser.instance = new CurrentUser();
    }
    return CurrentUser.instance;
  }

  setData(oUser) {
    this.uuid = oUser.uuid;
    this.id = oUser.id;
    this.firstName = oUser.firstName;
    this.lastName = oUser.lastName;
    this.email = oUser.email;
    this.username = oUser.username;
    this.address = oUser.address;
    this.phoneNumber = oUser.phoneNumber;
    this.type = oUser.type;
  }
}

export default CurrentUser.getInstance;
