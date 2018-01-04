export const statusHelper = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

export const apiFetch = (path, token) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'json');
  myHeaders.append('Access-Control-Allow-Origin', '*');
  myHeaders.append('Authorization', 'Bearer ' + token);
  var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    accept: 'application/json'
  };
  return fetch('/api/' + path, myInit);
};
