import { apiFetch, statusHelper } from './api-fetch';

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

  list(path, token) {
    return apiFetch(path, token)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

  push(value) {
    return new Promise((resolve, reject) => {
      // firebaseDb.ref(this.path)
      //   .push(value, error => error ? reject(error) : resolve());
      resolve('?pushed?');
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      // firebaseDb.ref(`${this.path}/${key}`)
      //   .remove(error => error ? reject(error) : resolve());
      resolve('?removed?');
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      // firebaseDb.ref(`${this.path}/${key}`)
      //   .update(value, error => error ? reject(error) : resolve());
      resolve('?updated?');
    });
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
  //     emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
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
