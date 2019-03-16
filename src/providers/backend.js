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
      queryUrl = url + '?' + _qs.default.stringify(queryParameters);
    }
    // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
    // console.log(method);
    // console.log(url);
    // console.log(body);
    // console.log(queryParameters);
    // console.log(form);
    // console.log(config);

    config.method = method;
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (body) {
      config.body = JSON.stringify(body);
    } else if (form) {
      config.body = _qs.default.stringify(form);
    }
    return fetch(queryUrl, config);
  };

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

  static authenticateUser_RAW_URL() {
    return '/user/authenticate';
  };

  static authenticateUser_TYPE() {
    return 'post';
  };

  static authenticateUserURL(parameters = {}) {
    let queryParameters = {};
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    let path = '/user/authenticate';

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    let keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
  };
}

export { Backend };
