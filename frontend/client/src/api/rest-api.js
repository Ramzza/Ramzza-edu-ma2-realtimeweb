// facade

import CurrentUser from "../utils/current-user";

class CrudFacade {
  static instance = CrudFacade.instance || new CrudFacade();

  static getInstance() {
    if (!CrudFacade.instance) {
      CrudFacade.instance = new CrudFacade();
    }
    return CrudFacade.instance;
  }

  constructor() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.oUser = CurrentUser();
    return CurrentUser;
  }

  getAllUsers(fnCallback) {
    const sReq = "/users/";
    fetch(sReq, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((users) => {
        fnCallback(users);
      });
  }

  getAllBooks(fnCallback) {
    const sReq = "/books/";
    fetch(sReq, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((books) => {
        fnCallback(books);
      });
  }

  postBook(oBook, fnCallback) {
    fetch("/books/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oBook),
    })
      .then((res) => res.json())
      .then((newBook) => {
        fnCallback(newBook);
      });
  }

  findUserById(id, fnCallback) {
    const sReq = "/users/" + id;
    fetch(sReq, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        fnCallback(user);
      });
  }

  deleteTask(sId, fnCallback) {
    const sReq = "/tasks/" + sId;
    fetch(sReq, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((task) => {
        fnCallback();
      });
  }
}

export default CrudFacade.getInstance;
