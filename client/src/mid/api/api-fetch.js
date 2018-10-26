export const statusHelper = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

export const apiFetch = (path, token, params) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: 'GET',
    headers: myHeaders,
    cache: 'default',
    accept: 'application/json'
  };
  var query = params ? '/' + encodeURIComponent(JSON.stringify(params)) : '';
  return fetch('/api/' + path + query, myInit);
};

export const apiRemove = (path, key, token) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: 'DELETE',
    headers: myHeaders,
    accept: 'application/json'
  };
  return fetch(`/api/${path}/${key}`, myInit);
};

export const apiInsert = (path, value, token) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(value),
    accept: 'application/json'
  };
  return fetch(`/api/${path}`, myInit);
};

export const apiUpdate = (path, key, changes, token) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(changes),
    accept: 'application/json'
  };
  return fetch(`/api/${path}/${key}`, myInit);
};

export const apiCustom = (path, key, action, data, method, token) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(data),
    accept: 'application/json'
  };
  return fetch(
    `/api/${path}${key === null ? '' : `/${key}`}/${action}`,
    myInit
  );
};

export const apiPdf = (path, action, params, token) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'blob');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: 'GET',
    headers: myHeaders,
    // body: JSON.stringify(params),
    accept: 'blob'
  };
  var query = params ? '/' + encodeURIComponent(JSON.stringify(params)) : '';

  return fetch(`/api/${path}/${action}${query}`, myInit);
};
