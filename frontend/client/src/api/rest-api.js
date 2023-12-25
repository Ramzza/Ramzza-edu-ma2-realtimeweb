/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
// facade

import CurrentUser from '../utils/current-user';

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

  patchUser(oUser, fnCallback) {
    const sReq = `/users/${oUser._id}`;
    fetch(sReq, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oUser),
    })
      .then((res) => res.json())
      .then(() => {
        fnCallback();
      });
  }

  getTasksForUser(sUser, fnCallback) {
    const sReq = `/tasks/${sUser}`;

    fetch(sReq)
      .then((res) => res.json())
      .then((tasks) => {
        fnCallback(tasks);
      });
  }

  patchTask(oTask, fnCallback) {
    const sReq = `/tasks/${oTask._id}`;
    fetch(sReq, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oTask),
    })
      .then((res) => res.json())
      .then(() => {
        fnCallback();
      });
  }

  postTask(oTask, fnCallback) {
    fetch('/tasks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oTask),
    })
      .then((res) => res.json())
      .then((newTask) => {
        fnCallback(newTask);
      });
  }

  deleteTask(sId, fnCallback) {
    const sReq = `/tasks/${sId}`;
    fetch(sReq, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        fnCallback();
      });
  }

  getPosts(fnCallback) {
    const sReq = '/posts';

    fetch(sReq)
      .then((res) => res.json())
      .then((posts) => {
        fnCallback(posts);
      });
  }

  postPost(oPost, fnCallback) {
    fetch('/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oPost),
    })
      .then((res) => res.json())
      .then((newPost) => {
        fnCallback(newPost);
      });
  }

  deletePost(sId, fnCallback) {
    const sReq = `/posts/${sId}`;
    fetch(sReq, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        fnCallback();
      });
  }
}

export default CrudFacade.getInstance;
