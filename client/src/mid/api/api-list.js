import {
  apiFetch,
  apiInsert,
  apiRemove,
  apiUpdate,
  statusHelper,
  apiCustom,
  apiPdf
} from './api-fetch';

export class ApiList {
  constructor(actions, modelClass, path) {
    this._actions = actions;
    this._modelClass = modelClass;
    this._path = path;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  list(params) {
    return apiFetch(this.path, this.token, params)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  // push(value) {
  //   return new Promise((resolve, reject) => {
  //     // firebaseDb.ref(this.path)
  //     //   .push(value, error => error ? reject(error) : resolve());
  //     resolve('?pushed?');
  //   });
  // }
  insert(value) {
    return apiInsert(this.path, value, this.token)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  remove(key) {
    return apiRemove(this.path, key, this.token)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  update(key, value) {
    return apiUpdate(this.path, key, value, this.token)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  customApiCall(key, action, data, method) {
    return apiCustom(this.path, key, action, data, method, this.token)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  customApiGet = (path, params) =>
    apiFetch(path, this.token, params)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);

  getPdf(params, action) {
    return apiPdf(this.path, action, params, this.token)
      .then(statusHelper)
      .then(response => response.blob())
      .then(
        response =>
          URL.createObjectURL(new Blob([response], { type: 'application/pdf' }))
        //response.blob().then(myBlob => URL.createObjectURL(myBlob))
      )
      .catch(error => error);
  }

  // subscribe(emit) {
  //   // let ref = firebaseDb.ref(this.path);
  //   let initialized = false;
  //   let list = [];
  //
  //   ref.once('value', () => {
  //     initialized = true;
  //     emit(this._actions.onLoad(list));
  //   });
  //
  //   ref.on('child_added', snapshot => {
  //     if (initialized) {
  //       emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
  //     } else {
  //       list.push(this.unwrapSnapshot(snapshot));
  //     }
  //   });
  //
  //   ref.on('child_changed', snapshot => {
  //     emit(this._actions.onDeptChange(this.unwrapSnapshot(snapshot)));
  //   });
  //
  //   ref.on('child_removed', snapshot => {
  //     emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
  //   });
  //
  //   return () => ref.off();
  // }

  // unwrapSnapshot(snapshot) {
  //   let attrs = snapshot.val();
  //   attrs.key = snapshot.key;
  //   return new this._modelClass(attrs);
  // }
}
