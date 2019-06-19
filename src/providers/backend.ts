import _qs from 'qs';

class Backend {

  static backendDomain = '';

  static getDomain() {
    return Backend.backendDomain;
  }

  static setDomain($domain: any) {
    Backend.backendDomain = $domain;
  }

  static request(method: any, url: string, body: any, queryParameters: any, form: any, config: any) {
    method = method.toUpperCase();
    const keys = Object.keys(queryParameters);
    let queryUrl = url;

    if (keys.length > 0) {
      queryUrl = url + '?' + _qs.stringify(queryParameters);
    }

    config.method = method;
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': config.headers['x-access-token']
    };
    if (method !== 'GET') {
      if (body) {
        config.body = JSON.stringify(body);
      } else if (form) {
        config.body = _qs.stringify(form);
      }
    }
    return fetch(queryUrl, config);
  }

  static multipartRequest(method: any, url: string, form: any, config: any) {
    const formData = new FormData();
    const files = form['files'];
    for (let i = 0; i < files.length; i++) {
      formData.append('files[]', files[i]);
    }
    const options = {
      method,
      headers: {
        // 'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
        'x-access-token': config.headers['x-access-token']
      },
      body: formData
    };
    return fetch(url, options);
  }

  /**
   * request: getUsersAsAdmin
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param role - Desired role.
   * @param keyword - Filtering keyword.
   * @param page - Number of pages to skip.
   * @param pageSize - Size of documents on one page.
   */
  static getUsersAsAdmin(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/admin/users';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['role'] !== undefined) {
      queryParameters['role'] = parameters['role'];
    }

    if (parameters['role'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: role'));
    }

    if (parameters['keyword'] !== undefined) {
      queryParameters['keyword'] = parameters['keyword'];
    }

    if (parameters['keyword'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: keyword'));
    }

    if (parameters['page'] !== undefined) {
      queryParameters['page'] = parameters['page'];
    }

    if (parameters['page'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: page'));
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: deactivateUserAsAdmin
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static deactivateUserAsAdmin(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/admin/users/{id}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: activateUserAsAdmin
   * url: activateUserAsAdminURL
   * method: activateUserAsAdmin_TYPE
   * raw_url: activateUserAsAdmin_RAW_URL
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static activateUserAsAdmin(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/admin/users/{id}/activate';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: changeUserRole
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   * @param role -
   */
  static changeUserRole(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/admin/users/{id}/role/{role}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    path = path.replace('{role}', `${parameters['role']}`);

    if (parameters['role'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: role'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getChats
   * @param xAccessToken - JWT created on user creation or authentication.
   */
  static getChats(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/chat/chats';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getChat
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param chat -
   */
  static getChat(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/chat/{chat}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{chat}', `${parameters['chat']}`);

    if (parameters['chat'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: chat'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: addLead
   * @param lead - JSON representation of the lead.
   */
  static addLead(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/lead';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['lead'] !== undefined) {
      body = parameters['lead'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getLeads
   * @param xAccessToken - JWT created on user creation or authentication.
   */
  static getLeads(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/lead';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getLead
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static getLead(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/lead/{id}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: placeBid
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param bid - JSON representation of the bid.
   * @param order -
   */
  static placeBid(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/bid/{order}/place';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['bid'] !== undefined) {
      body = parameters['bid'];
    }

    path = path.replace('{order}', `${parameters['order']}`);

    if (parameters['order'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: order'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: placeFinalBid
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param bid - JSON representation of the bid.
   * @param order -
   */
  static placeFinalBid(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/bid/{order}/final';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['bid'] !== undefined) {
      body = parameters['bid'];
    }

    path = path.replace('{order}', `${parameters['order']}`);

    if (parameters['order'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: order'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getOrderBids
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param order -
   */
  static getOrderBids(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/bid/by-order/{order}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{order}', `${parameters['order']}`);

    if (parameters['order'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: order'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: removeFavoriteMerchant
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param merchant -
   */
  static removeFavoriteMerchant(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/customer/favorites/merchant/{merchant}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{merchant}', `${parameters['merchant']}`);

    if (parameters['merchant'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: merchant'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getFavoritesList
   * @param xAccessToken - JWT created on user creation or authentication.
   */
  static getFavoritesList(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/customer/favorites/merchants';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getMerchantById
   * @param id -
   */
  static getMerchantById(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/merchant/{id}/details';
    const body: any = {};
    const queryParameters = {};
    const form = {};
    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getMerchantByUsername
   * @param username -
   */
  static getMerchantByUsername(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/merchant/by-username/{username}';
    const body: any = {};
    const queryParameters = {};
    const form = {};
    path = path.replace('{username}', `${parameters['username']}`);

    if (parameters['username'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: username'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: createMerchant
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param user - JSON representation of the user.
   */
  static createMerchant(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/merchant/account/payment';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getNearbyMerchants
   * @param latitude - Geolocation latitude value.
   * @param longitude - Geolocation longitude value.
   * @param radius - Maximum radius to search for (km).
   * @param keyword - Geolocation keyword value.
   */
  static getNearbyMerchants(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/merchant/nearby';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['latitude'] !== undefined) {
      queryParameters['latitude'] = parameters['latitude'];
    }

    if (parameters['latitude'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: latitude'));
    }

    if (parameters['longitude'] !== undefined) {
      queryParameters['longitude'] = parameters['longitude'];
    }

    if (parameters['longitude'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: longitude'));
    }

    if (parameters['radius'] !== undefined) {
      queryParameters['radius'] = parameters['radius'];
    }

    if (parameters['keyword'] !== undefined) {
      queryParameters['keyword'] = parameters['keyword'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getNearbyMerchantsByService
   * @param service - Requested service name.
   * @param latitude - Geolocation latitude value.
   * @param longitude - Geolocation longitude value.
   * @param keyword - Geolocation keyword value.
   * @param radius - Maximum radius to search for (km).
   */
  static getNearbyMerchantsByService(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/merchant/nearby/{service}';
    const body: any = {};
    const queryParameters = {};
    const form = {};
    path = path.replace('{service}', `${parameters['service']}`);

    if (parameters['service'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: service'));
    }

    if (parameters['latitude'] !== undefined) {
      queryParameters['latitude'] = parameters['latitude'];
    }

    if (parameters['latitude'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: latitude'));
    }

    if (parameters['longitude'] !== undefined) {
      queryParameters['longitude'] = parameters['longitude'];
    }

    if (parameters['longitude'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: longitude'));
    }

    if (parameters['keyword'] !== undefined) {
      queryParameters['keyword'] = parameters['keyword'];
    }

    if (parameters['radius'] !== undefined) {
      queryParameters['radius'] = parameters['radius'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: createOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param order - JSON representation of the order to be created.
   */
  static createOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['order'] !== undefined) {
      body = parameters['order'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getOrders
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param status - Filtering status.
   */
  static getOrders(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['status'] !== undefined) {
      queryParameters['status'] = parameters['status'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getReadyOrders
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param status - Filtering status.
   */
  static getReadyOrders(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order/ready';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getOrdersByPeriod
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param status - Filtering status.
   * @param startDate - Filtering start date.
   * @param endDate - Filtering end date.
   */
  static getOrdersByPeriod(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order/between-dates';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['status'] !== undefined) {
      queryParameters['status'] = parameters['status'];
    }

    if (parameters['startDate'] !== undefined) {
      queryParameters['startDate'] = parameters['startDate'];
    }

    if (parameters['endDate'] !== undefined) {
      queryParameters['endDate'] = parameters['endDate'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static getOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: acceptOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static acceptOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}/accept';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: cancelOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static cancelOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}/cancel';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: finishOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static finishOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}/finish';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: rateOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   * @param rate -
   */
  static rateOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}/rate/{rate}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    path = path.replace('{rate}', `${parameters['rate']}`);

    if (parameters['rate'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: rate'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getReceivingModes
   * url: getReceivingModesURL
   * method: getReceivingModes_TYPE
   * raw_url: getReceivingModes_RAW_URL
   */
  static getReceivingModes(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order/receiving-modes';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getPaymentModes
   * url: getPaymentModesURL
   * method: getPaymentModes_TYPE
   * raw_url: getPaymentModes_RAW_URL
   */
  static getPaymentModes(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order/payment-modes/list';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getOrdersNearby
   * @param latitude - Geolocation latitude value.
   * @param longitude - Geolocation longitude value.
   * @param radius - Maximum radius to search for (km).
   * @param keyword - Geolocation keyword value.
   * @param page - Number of pages to skip.
   * @param pageSize - Size of documents on one page.
   */
  static getOrdersNearby(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/order/by-location/nearby';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['latitude'] !== undefined) {
      queryParameters['latitude'] = parameters['latitude'];
    }

    if (parameters['latitude'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: latitude'));
    }

    if (parameters['longitude'] !== undefined) {
      queryParameters['longitude'] = parameters['longitude'];
    }

    if (parameters['longitude'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: longitude'));
    }

    if (parameters['radius'] !== undefined) {
      queryParameters['radius'] = parameters['radius'];
    }

    if (parameters['keyword'] !== undefined) {
      queryParameters['keyword'] = parameters['keyword'];
    }

    if (parameters['page'] !== undefined) {
      queryParameters['page'] = parameters['page'];
    }

    if (parameters['page'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: page'));
    }

    if (parameters['pageSize'] !== undefined) {
      queryParameters['pageSize'] = parameters['pageSize'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: setOrderMerchant
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   * @param merchant -
   */
  static setOrderMerchant(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}/merchant/{merchant}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    path = path.replace('{merchant}', `${parameters['merchant']}`);

    if (parameters['merchant'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: merchant'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: startOrder
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static startOrder(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/order/{id}/start';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: sendNotification
   * @param xAccessToken - JWT created on user creation or authentication.
   */
  static sendNotification(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/notification/send';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getNotifications
   * @param xAccessToken - JWT created on user creation or authentication.
   */
  static getNotifications(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/notification';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getNotification
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static getNotification(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/notification/{id}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: accessWithFacebook
   * @param accessToken - User access token returned from Facebook oauth.
   */
  static accessWithFacebook(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/oauth/access/facebook';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['accessToken'] !== undefined) {
      queryParameters['access_token'] = parameters['accessToken'];
    }

    if (parameters['accessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: accessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * Send images to system.
   * @param multipart - Image to upload
   */
  static addPicture(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/picture/save';
    // const body: any = {};
    const queryParameters = {};
    const form = {};

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
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.multipartRequest('POST', domain + path, form, config);
  }

  /**
   * request: getPicture
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static getPicture(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/picture/{id}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getPictures
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param ids - list of ids
   */
  static getPictures(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/picture/multiple';
    const body: any = {};
    let queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['ids'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    /*if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }*/
    queryParameters = { ids: String(parameters['ids']) };

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getLatest
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param itemId -
   */
  static getLatest(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/picture/{itemId}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{itemId}', `${parameters['itemId']}`);

    if (parameters['itemId'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: itemId'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: removePicture
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param id -
   */
  static removePicture(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/picture/remove/{id}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{id}', `${parameters['id']}`);

    if (parameters['id'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: id'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * Creates an element with user data.
   * @param user - User credentials object.
   */
  static createUser(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/user/create';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: isUniqueUsername
   * @param username -
   */
  static isUniqueUsername(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/user/username/exists/{username}';
    const body: any = {};
    const queryParameters = {};
    const form = {};
    path = path.replace('{username}', `${parameters['username']}`);

    if (parameters['username'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: username'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: getUserProfile
   * @param xAccessToken - JWT created on user creation or authentication.
   */
  static getUserProfile(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/user/profile';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('get', domain + path, body, queryParameters, form, config);
  }

  /**
   * Authenticates an user with e-mail and password.
   * @param user - User credentials object.
   */
  static authenticateUser(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/user/authenticate';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  static updateUser(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/user/update';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: recoverPassword
   * @param email -
   */
  static recoverPassword(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/user/password/recover/{email}';
    const body: any = {};
    const queryParameters = {};
    const form = {};
    path = path.replace('{email}', `${parameters['email']}`);

    if (parameters['email'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: email'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: updatePassword
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param user - User credentials object.
   */
  static updatePassword(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    const path = '/user/password/update';
    let body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    if (parameters['user'] !== undefined) {
      body = parameters['user'];
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }

  /**
   * request: addSkip
   * @param xAccessToken - JWT created on user creation or authentication.
   * @param skip - User step in order to skip.
   */
  static addSkip(parameters: any = {}) {
    const domain = parameters.$domain ? parameters.$domain : Backend.getDomain();
    const config = parameters.$config || {
      headers: {}
    };
    let path = '/user/skips/{skip}';
    const body: any = {};
    const queryParameters = {};
    const form = {};

    if (parameters['xAccessToken'] !== undefined) {
      config.headers['x-access-token'] = parameters['xAccessToken'];
    }

    if (parameters['xAccessToken'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
    }

    path = path.replace('{skip}', `${parameters['skip']}`);

    if (parameters['skip'] === undefined) {
      return Promise.reject(new Error('Missing required  parameter: skip'));
    }

    if (parameters.$queryParameters) {
      Object.keys(parameters.$queryParameters).forEach((parameterName) => {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
      });
    }

    return Backend.request('post', domain + path, body, queryParameters, form, config);
  }
}

export { Backend };
