import _qs from 'qs';

let domain = '';

class Backend {

  static getDomain() {
    return domain;
  };

  static setDomain($domain) {
    domain = $domain;
  };

  static request(method, url, body, queryParameters, form, config) {
    method = method.toUpperCase();
    let keys = Object.keys(queryParameters);
    let queryUrl = url;

    if (keys.length > 0) {
      queryUrl = url + '?' + _qs.stringify(queryParameters);
    }

    config.method = method;
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (body) {
      config.body = JSON.stringify(body);
    } else if (form) {
      config.body = _qs.stringify(form);
    }
    return fetch(queryUrl, config);
  };

  static multipartRequest(method, url, form, config) {
    var formData  = new FormData();
    formData.append('files[]', form['files']);
    let options = {
      method: method,
      headers: {
        // 'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
        'x-access-token': config.headers['x-access-token']
      },
      body: formData
    };
    return fetch(url, options);
  }

  /**
   *
   * request: authenticateUser
   * url: authenticateUserURL
   * method: authenticateUser_TYPE
   * raw_url: authenticateUser_RAW_URL
   * @param user - User credentials object.
   */
  static authenticateUser(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/user/authenticate';
    let body;
    let queryParameters = {};
    let form = {};

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  };

  static createUser(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/user/create';
    let body;
    let queryParameters = {};
    let form = {};

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  };

  static addPicture(parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/picture/save';
    let body;
    let queryParameters = {};
    let form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['files'] !== undefined) {
      form['files'] = parameters['files'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.multipartRequest('POST', domain + path, form, config);
  };
}

export { Backend };
