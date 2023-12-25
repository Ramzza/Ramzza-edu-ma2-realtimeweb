class CurrentUser {
static instance = CurrentUser.instance || new CurrentUser();

static getInstance() {
  if (!CurrentUser.instance) {
    CurrentUser.instance = new CurrentUser();
  }
  return CurrentUser.instance;
}

setData(oUser) {
  // eslint-disable-next-line no-underscore-dangle
  this._id = oUser._id;
  this.firstname = oUser.firstname;
  this.lastname = oUser.lastname;
  this.cnp = oUser.cnp;
  this.email = oUser.email;
  this.username = oUser.username;
  this.date_started = oUser.date_started;
  this.date_end = oUser.date_end;
  this.position = oUser.position;
  this.salary = oUser.salary;
  this.pc = oUser.pc;
  this.car = oUser.car;
  this.comments = oUser.comments;
}
}

export default CurrentUser.getInstance;
