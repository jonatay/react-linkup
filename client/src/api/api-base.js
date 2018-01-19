import { apiCustom, statusHelper } from "./api-fetch";

export class ApiBase {

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

  customApiCall(key, action, data, method) {
    return apiCustom(this.path, key, action, data, method, this.token)
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error);
  }

}