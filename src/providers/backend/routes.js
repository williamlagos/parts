"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOrder = exports.acceptOrderURL = exports.acceptOrder_TYPE = exports.acceptOrder_RAW_URL = exports.acceptOrder = exports.getOrderURL = exports.getOrder_TYPE = exports.getOrder_RAW_URL = exports.getOrder = exports.getOrdersByPeriodURL = exports.getOrdersByPeriod_TYPE = exports.getOrdersByPeriod_RAW_URL = exports.getOrdersByPeriod = exports.getOrdersURL = exports.getOrders_TYPE = exports.getOrders_RAW_URL = exports.getOrders = exports.createOrderURL = exports.createOrder_TYPE = exports.createOrder_RAW_URL = exports.createOrder = exports.getNearbyMerchantsByServiceURL = exports.getNearbyMerchantsByService_TYPE = exports.getNearbyMerchantsByService_RAW_URL = exports.getNearbyMerchantsByService = exports.getNearbyMerchantsURL = exports.getNearbyMerchants_TYPE = exports.getNearbyMerchants_RAW_URL = exports.getNearbyMerchants = exports.createMerchantURL = exports.createMerchant_TYPE = exports.createMerchant_RAW_URL = exports.createMerchant = exports.getMerchantByUsernameURL = exports.getMerchantByUsername_TYPE = exports.getMerchantByUsername_RAW_URL = exports.getMerchantByUsername = exports.getMerchantByIdURL = exports.getMerchantById_TYPE = exports.getMerchantById_RAW_URL = exports.getMerchantById = exports.getFavoritesListURL = exports.getFavoritesList_TYPE = exports.getFavoritesList_RAW_URL = exports.getFavoritesList = exports.removeFavoriteMerchantURL = exports.removeFavoriteMerchant_TYPE = exports.removeFavoriteMerchant_RAW_URL = exports.removeFavoriteMerchant = exports.getOrderBidsURL = exports.getOrderBids_TYPE = exports.getOrderBids_RAW_URL = exports.getOrderBids = exports.placeFinalBidURL = exports.placeFinalBid_TYPE = exports.placeFinalBid_RAW_URL = exports.placeFinalBid = exports.placeBidURL = exports.placeBid_TYPE = exports.placeBid_RAW_URL = exports.placeBid = exports.getLeadURL = exports.getLead_TYPE = exports.getLead_RAW_URL = exports.getLead = exports.getLeadsURL = exports.getLeads_TYPE = exports.getLeads_RAW_URL = exports.getLeads = exports.addLeadURL = exports.addLead_TYPE = exports.addLead_RAW_URL = exports.addLead = exports.getChatURL = exports.getChat_TYPE = exports.getChat_RAW_URL = exports.getChat = exports.getChatsURL = exports.getChats_TYPE = exports.getChats_RAW_URL = exports.getChats = exports.changeUserRoleURL = exports.changeUserRole_TYPE = exports.changeUserRole_RAW_URL = exports.changeUserRole = exports.activateUserAsAdminURL = exports.activateUserAsAdmin_TYPE = exports.activateUserAsAdmin_RAW_URL = exports.activateUserAsAdmin = exports.deactivateUserAsAdminURL = exports.deactivateUserAsAdmin_TYPE = exports.deactivateUserAsAdmin_RAW_URL = exports.deactivateUserAsAdmin = exports.getUsersAsAdminURL = exports.getUsersAsAdmin_TYPE = exports.getUsersAsAdmin_RAW_URL = exports.getUsersAsAdmin = exports.request = exports.setDomain = exports.getDomain = void 0;
exports.addSkipURL = exports.addSkip_TYPE = exports.addSkip_RAW_URL = exports.addSkip = exports.updatePasswordURL = exports.updatePassword_TYPE = exports.updatePassword_RAW_URL = exports.updatePassword = exports.recoverPasswordURL = exports.recoverPassword_TYPE = exports.recoverPassword_RAW_URL = exports.recoverPassword = exports.updateUserURL = exports.updateUser_TYPE = exports.updateUser_RAW_URL = exports.updateUser = exports.authenticateUserURL = exports.authenticateUser_TYPE = exports.authenticateUser_RAW_URL = exports.authenticateUser = exports.getUserProfileURL = exports.getUserProfile_TYPE = exports.getUserProfile_RAW_URL = exports.getUserProfile = exports.isUniqueUsernameURL = exports.isUniqueUsername_TYPE = exports.isUniqueUsername_RAW_URL = exports.isUniqueUsername = exports.createUserURL = exports.createUser_TYPE = exports.createUser_RAW_URL = exports.createUser = exports.removePictureURL = exports.removePicture_TYPE = exports.removePicture_RAW_URL = exports.removePicture = exports.getLatestURL = exports.getLatest_TYPE = exports.getLatest_RAW_URL = exports.getLatest = exports.getPictureURL = exports.getPicture_TYPE = exports.getPicture_RAW_URL = exports.getPicture = exports.addPictureURL = exports.addPicture_TYPE = exports.addPicture_RAW_URL = exports.addPicture = exports.accessWithFacebookURL = exports.accessWithFacebook_TYPE = exports.accessWithFacebook_RAW_URL = exports.accessWithFacebook = exports.getNotificationURL = exports.getNotification_TYPE = exports.getNotification_RAW_URL = exports.getNotification = exports.getNotificationsURL = exports.getNotifications_TYPE = exports.getNotifications_RAW_URL = exports.getNotifications = exports.sendNotificationURL = exports.sendNotification_TYPE = exports.sendNotification_RAW_URL = exports.sendNotification = exports.startOrderURL = exports.startOrder_TYPE = exports.startOrder_RAW_URL = exports.startOrder = exports.setOrderMerchantURL = exports.setOrderMerchant_TYPE = exports.setOrderMerchant_RAW_URL = exports.setOrderMerchant = exports.getOrdersNearbyURL = exports.getOrdersNearby_TYPE = exports.getOrdersNearby_RAW_URL = exports.getOrdersNearby = exports.getPaymentModesURL = exports.getPaymentModes_TYPE = exports.getPaymentModes_RAW_URL = exports.getPaymentModes = exports.getReceivingModesURL = exports.getReceivingModes_TYPE = exports.getReceivingModes_RAW_URL = exports.getReceivingModes = exports.rateOrderURL = exports.rateOrder_TYPE = exports.rateOrder_RAW_URL = exports.rateOrder = exports.cancelOrderURL = exports.cancelOrder_TYPE = exports.cancelOrder_RAW_URL = void 0;

/*==========================================================
 *
 ==========================================================*/

/**
 *
 * request: getUsersAsAdmin
 * url: getUsersAsAdminURL
 * method: getUsersAsAdmin_TYPE
 * raw_url: getUsersAsAdmin_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param role - Desired role.
 * @param keyword - Filtering keyword.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 */


exports.request = request;

const getUsersAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getUsersAsAdmin = getUsersAsAdmin;

const getUsersAsAdmin_RAW_URL = function () {
  return '/admin/users';
};

exports.getUsersAsAdmin_RAW_URL = getUsersAsAdmin_RAW_URL;

const getUsersAsAdmin_TYPE = function () {
  return 'get';
};

exports.getUsersAsAdmin_TYPE = getUsersAsAdmin_TYPE;

const getUsersAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users';

  if (parameters['role'] !== undefined) {
    queryParameters['role'] = parameters['role'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['page'] !== undefined) {
    queryParameters['page'] = parameters['page'];
  }

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: deactivateUserAsAdmin
 * url: deactivateUserAsAdminURL
 * method: deactivateUserAsAdmin_TYPE
 * raw_url: deactivateUserAsAdmin_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.getUsersAsAdminURL = getUsersAsAdminURL;

const deactivateUserAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users/{id}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.deactivateUserAsAdmin = deactivateUserAsAdmin;

const deactivateUserAsAdmin_RAW_URL = function () {
  return '/admin/users/{id}';
};

exports.deactivateUserAsAdmin_RAW_URL = deactivateUserAsAdmin_RAW_URL;

const deactivateUserAsAdmin_TYPE = function () {
  return 'post';
};

exports.deactivateUserAsAdmin_TYPE = deactivateUserAsAdmin_TYPE;

const deactivateUserAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: activateUserAsAdmin
 * url: activateUserAsAdminURL
 * method: activateUserAsAdmin_TYPE
 * raw_url: activateUserAsAdmin_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.deactivateUserAsAdminURL = deactivateUserAsAdminURL;

const activateUserAsAdmin = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users/{id}/activate';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.activateUserAsAdmin = activateUserAsAdmin;

const activateUserAsAdmin_RAW_URL = function () {
  return '/admin/users/{id}/activate';
};

exports.activateUserAsAdmin_RAW_URL = activateUserAsAdmin_RAW_URL;

const activateUserAsAdmin_TYPE = function () {
  return 'post';
};

exports.activateUserAsAdmin_TYPE = activateUserAsAdmin_TYPE;

const activateUserAsAdminURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users/{id}/activate';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: changeUserRole
 * url: changeUserRoleURL
 * method: changeUserRole_TYPE
 * raw_url: changeUserRole_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 * @param role -
 */


exports.activateUserAsAdminURL = activateUserAsAdminURL;

const changeUserRole = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/admin/users/{id}/role/{role}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.changeUserRole = changeUserRole;

const changeUserRole_RAW_URL = function () {
  return '/admin/users/{id}/role/{role}';
};

exports.changeUserRole_RAW_URL = changeUserRole_RAW_URL;

const changeUserRole_TYPE = function () {
  return 'post';
};

exports.changeUserRole_TYPE = changeUserRole_TYPE;

const changeUserRoleURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/admin/users/{id}/role/{role}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{role}', `${parameters['role']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getChats
 * url: getChatsURL
 * method: getChats_TYPE
 * raw_url: getChats_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.changeUserRoleURL = changeUserRoleURL;

const getChats = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/chat/chats';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getChats = getChats;

const getChats_RAW_URL = function () {
  return '/chat/chats';
};

exports.getChats_RAW_URL = getChats_RAW_URL;

const getChats_TYPE = function () {
  return 'get';
};

exports.getChats_TYPE = getChats_TYPE;

const getChatsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/chat/chats';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getChat
 * url: getChatURL
 * method: getChat_TYPE
 * raw_url: getChat_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param chat -
 */


exports.getChatsURL = getChatsURL;

const getChat = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/chat/{chat}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getChat = getChat;

const getChat_RAW_URL = function () {
  return '/chat/{chat}';
};

exports.getChat_RAW_URL = getChat_RAW_URL;

const getChat_TYPE = function () {
  return 'get';
};

exports.getChat_TYPE = getChat_TYPE;

const getChatURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/chat/{chat}';
  path = path.replace('{chat}', `${parameters['chat']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: addLead
 * url: addLeadURL
 * method: addLead_TYPE
 * raw_url: addLead_RAW_URL
 * @param lead - JSON representation of the lead.
 */


exports.getChatURL = getChatURL;

const addLead = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/lead';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['lead'] !== undefined) {
    body = parameters['lead'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addLead = addLead;

const addLead_RAW_URL = function () {
  return '/lead';
};

exports.addLead_RAW_URL = addLead_RAW_URL;

const addLead_TYPE = function () {
  return 'post';
};

exports.addLead_TYPE = addLead_TYPE;

const addLeadURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/lead';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getLeads
 * url: getLeadsURL
 * method: getLeads_TYPE
 * raw_url: getLeads_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.addLeadURL = addLeadURL;

const getLeads = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/lead';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getLeads = getLeads;

const getLeads_RAW_URL = function () {
  return '/lead';
};

exports.getLeads_RAW_URL = getLeads_RAW_URL;

const getLeads_TYPE = function () {
  return 'get';
};

exports.getLeads_TYPE = getLeads_TYPE;

const getLeadsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/lead';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getLead
 * url: getLeadURL
 * method: getLead_TYPE
 * raw_url: getLead_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.getLeadsURL = getLeadsURL;

const getLead = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/lead/{id}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getLead = getLead;

const getLead_RAW_URL = function () {
  return '/lead/{id}';
};

exports.getLead_RAW_URL = getLead_RAW_URL;

const getLead_TYPE = function () {
  return 'get';
};

exports.getLead_TYPE = getLead_TYPE;

const getLeadURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/lead/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: placeBid
 * url: placeBidURL
 * method: placeBid_TYPE
 * raw_url: placeBid_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param bid - JSON representation of the bid.
 * @param order -
 */


exports.getLeadURL = getLeadURL;

const placeBid = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/bid/{order}/place';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.placeBid = placeBid;

const placeBid_RAW_URL = function () {
  return '/bid/{order}/place';
};

exports.placeBid_RAW_URL = placeBid_RAW_URL;

const placeBid_TYPE = function () {
  return 'post';
};

exports.placeBid_TYPE = placeBid_TYPE;

const placeBidURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/bid/{order}/place';
  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: placeFinalBid
 * url: placeFinalBidURL
 * method: placeFinalBid_TYPE
 * raw_url: placeFinalBid_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param bid - JSON representation of the bid.
 * @param order -
 */


exports.placeBidURL = placeBidURL;

const placeFinalBid = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/bid/{order}/final';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.placeFinalBid = placeFinalBid;

const placeFinalBid_RAW_URL = function () {
  return '/bid/{order}/final';
};

exports.placeFinalBid_RAW_URL = placeFinalBid_RAW_URL;

const placeFinalBid_TYPE = function () {
  return 'post';
};

exports.placeFinalBid_TYPE = placeFinalBid_TYPE;

const placeFinalBidURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/bid/{order}/final';
  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getOrderBids
 * url: getOrderBidsURL
 * method: getOrderBids_TYPE
 * raw_url: getOrderBids_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param order -
 */


exports.placeFinalBidURL = placeFinalBidURL;

const getOrderBids = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/bid/by-order/{order}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getOrderBids = getOrderBids;

const getOrderBids_RAW_URL = function () {
  return '/bid/by-order/{order}';
};

exports.getOrderBids_RAW_URL = getOrderBids_RAW_URL;

const getOrderBids_TYPE = function () {
  return 'get';
};

exports.getOrderBids_TYPE = getOrderBids_TYPE;

const getOrderBidsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/bid/by-order/{order}';
  path = path.replace('{order}', `${parameters['order']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: removeFavoriteMerchant
 * url: removeFavoriteMerchantURL
 * method: removeFavoriteMerchant_TYPE
 * raw_url: removeFavoriteMerchant_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param merchant -
 */


exports.getOrderBidsURL = getOrderBidsURL;

const removeFavoriteMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/customer/favorites/merchant/{merchant}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.removeFavoriteMerchant = removeFavoriteMerchant;

const removeFavoriteMerchant_RAW_URL = function () {
  return '/customer/favorites/merchant/{merchant}';
};

exports.removeFavoriteMerchant_RAW_URL = removeFavoriteMerchant_RAW_URL;

const removeFavoriteMerchant_TYPE = function () {
  return 'post';
};

exports.removeFavoriteMerchant_TYPE = removeFavoriteMerchant_TYPE;

const removeFavoriteMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/customer/favorites/merchant/{merchant}';
  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getFavoritesList
 * url: getFavoritesListURL
 * method: getFavoritesList_TYPE
 * raw_url: getFavoritesList_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.removeFavoriteMerchantURL = removeFavoriteMerchantURL;

const getFavoritesList = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/customer/favorites/merchants';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getFavoritesList = getFavoritesList;

const getFavoritesList_RAW_URL = function () {
  return '/customer/favorites/merchants';
};

exports.getFavoritesList_RAW_URL = getFavoritesList_RAW_URL;

const getFavoritesList_TYPE = function () {
  return 'get';
};

exports.getFavoritesList_TYPE = getFavoritesList_TYPE;

const getFavoritesListURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/customer/favorites/merchants';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getMerchantById
 * url: getMerchantByIdURL
 * method: getMerchantById_TYPE
 * raw_url: getMerchantById_RAW_URL
 * @param id -
 */


exports.getFavoritesListURL = getFavoritesListURL;

const getMerchantById = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/{id}/details';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getMerchantById = getMerchantById;

const getMerchantById_RAW_URL = function () {
  return '/merchant/{id}/details';
};

exports.getMerchantById_RAW_URL = getMerchantById_RAW_URL;

const getMerchantById_TYPE = function () {
  return 'get';
};

exports.getMerchantById_TYPE = getMerchantById_TYPE;

const getMerchantByIdURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/{id}/details';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getMerchantByUsername
 * url: getMerchantByUsernameURL
 * method: getMerchantByUsername_TYPE
 * raw_url: getMerchantByUsername_RAW_URL
 * @param username -
 */


exports.getMerchantByIdURL = getMerchantByIdURL;

const getMerchantByUsername = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/by-username/{username}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getMerchantByUsername = getMerchantByUsername;

const getMerchantByUsername_RAW_URL = function () {
  return '/merchant/by-username/{username}';
};

exports.getMerchantByUsername_RAW_URL = getMerchantByUsername_RAW_URL;

const getMerchantByUsername_TYPE = function () {
  return 'get';
};

exports.getMerchantByUsername_TYPE = getMerchantByUsername_TYPE;

const getMerchantByUsernameURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/by-username/{username}';
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: createMerchant
 * url: createMerchantURL
 * method: createMerchant_TYPE
 * raw_url: createMerchant_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param user - JSON representation of the user.
 */


exports.getMerchantByUsernameURL = getMerchantByUsernameURL;

const createMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/account/payment';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.createMerchant = createMerchant;

const createMerchant_RAW_URL = function () {
  return '/merchant/account/payment';
};

exports.createMerchant_RAW_URL = createMerchant_RAW_URL;

const createMerchant_TYPE = function () {
  return 'post';
};

exports.createMerchant_TYPE = createMerchant_TYPE;

const createMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/account/payment';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getNearbyMerchants
 * url: getNearbyMerchantsURL
 * method: getNearbyMerchants_TYPE
 * raw_url: getNearbyMerchants_RAW_URL
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param radius - Maximum radius to search for (km).
 * @param keyword - Geolocation keyword value.
 */


exports.createMerchantURL = createMerchantURL;

const getNearbyMerchants = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/nearby';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getNearbyMerchants = getNearbyMerchants;

const getNearbyMerchants_RAW_URL = function () {
  return '/merchant/nearby';
};

exports.getNearbyMerchants_RAW_URL = getNearbyMerchants_RAW_URL;

const getNearbyMerchants_TYPE = function () {
  return 'get';
};

exports.getNearbyMerchants_TYPE = getNearbyMerchants_TYPE;

const getNearbyMerchantsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/nearby';

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getNearbyMerchantsByService
 * url: getNearbyMerchantsByServiceURL
 * method: getNearbyMerchantsByService_TYPE
 * raw_url: getNearbyMerchantsByService_RAW_URL
 * @param service - Requested service name.
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param keyword - Geolocation keyword value.
 * @param radius - Maximum radius to search for (km).
 */


exports.getNearbyMerchantsURL = getNearbyMerchantsURL;

const getNearbyMerchantsByService = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/merchant/nearby/{service}';
  let body;
  let queryParameters = {};
  let form = {};
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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getNearbyMerchantsByService = getNearbyMerchantsByService;

const getNearbyMerchantsByService_RAW_URL = function () {
  return '/merchant/nearby/{service}';
};

exports.getNearbyMerchantsByService_RAW_URL = getNearbyMerchantsByService_RAW_URL;

const getNearbyMerchantsByService_TYPE = function () {
  return 'get';
};

exports.getNearbyMerchantsByService_TYPE = getNearbyMerchantsByService_TYPE;

const getNearbyMerchantsByServiceURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/merchant/nearby/{service}';
  path = path.replace('{service}', `${parameters['service']}`);

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
  }

  if (parameters['keyword'] !== undefined) {
    queryParameters['keyword'] = parameters['keyword'];
  }

  if (parameters['radius'] !== undefined) {
    queryParameters['radius'] = parameters['radius'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: createOrder
 * url: createOrderURL
 * method: createOrder_TYPE
 * raw_url: createOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param order - JSON representation of the order to be created.
 */


exports.getNearbyMerchantsByServiceURL = getNearbyMerchantsByServiceURL;

const createOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.createOrder = createOrder;

const createOrder_RAW_URL = function () {
  return '/order';
};

exports.createOrder_RAW_URL = createOrder_RAW_URL;

const createOrder_TYPE = function () {
  return 'post';
};

exports.createOrder_TYPE = createOrder_TYPE;

const createOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getOrders
 * url: getOrdersURL
 * method: getOrders_TYPE
 * raw_url: getOrders_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param status - Filtering status.
 */


exports.createOrderURL = createOrderURL;

const getOrders = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getOrders = getOrders;

const getOrders_RAW_URL = function () {
  return '/order';
};

exports.getOrders_RAW_URL = getOrders_RAW_URL;

const getOrders_TYPE = function () {
  return 'get';
};

exports.getOrders_TYPE = getOrders_TYPE;

const getOrdersURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order';

  if (parameters['status'] !== undefined) {
    queryParameters['status'] = parameters['status'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getOrdersByPeriod
 * url: getOrdersByPeriodURL
 * method: getOrdersByPeriod_TYPE
 * raw_url: getOrdersByPeriod_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param status - Filtering status.
 * @param startDate - Filtering start date.
 * @param endDate - Filtering end date.
 */


exports.getOrdersURL = getOrdersURL;

const getOrdersByPeriod = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/between-dates';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getOrdersByPeriod = getOrdersByPeriod;

const getOrdersByPeriod_RAW_URL = function () {
  return '/order/between-dates';
};

exports.getOrdersByPeriod_RAW_URL = getOrdersByPeriod_RAW_URL;

const getOrdersByPeriod_TYPE = function () {
  return 'get';
};

exports.getOrdersByPeriod_TYPE = getOrdersByPeriod_TYPE;

const getOrdersByPeriodURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/between-dates';

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getOrder
 * url: getOrderURL
 * method: getOrder_TYPE
 * raw_url: getOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.getOrdersByPeriodURL = getOrdersByPeriodURL;

const getOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getOrder = getOrder;

const getOrder_RAW_URL = function () {
  return '/order/{id}';
};

exports.getOrder_RAW_URL = getOrder_RAW_URL;

const getOrder_TYPE = function () {
  return 'get';
};

exports.getOrder_TYPE = getOrder_TYPE;

const getOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: acceptOrder
 * url: acceptOrderURL
 * method: acceptOrder_TYPE
 * raw_url: acceptOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.getOrderURL = getOrderURL;

const acceptOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/accept';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.acceptOrder = acceptOrder;

const acceptOrder_RAW_URL = function () {
  return '/order/{id}/accept';
};

exports.acceptOrder_RAW_URL = acceptOrder_RAW_URL;

const acceptOrder_TYPE = function () {
  return 'post';
};

exports.acceptOrder_TYPE = acceptOrder_TYPE;

const acceptOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/accept';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: cancelOrder
 * url: cancelOrderURL
 * method: cancelOrder_TYPE
 * raw_url: cancelOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.acceptOrderURL = acceptOrderURL;

const cancelOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/cancel';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.cancelOrder = cancelOrder;

const cancelOrder_RAW_URL = function () {
  return '/order/{id}/cancel';
};

exports.cancelOrder_RAW_URL = cancelOrder_RAW_URL;

const cancelOrder_TYPE = function () {
  return 'get';
};

exports.cancelOrder_TYPE = cancelOrder_TYPE;

const cancelOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/cancel';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: rateOrder
 * url: rateOrderURL
 * method: rateOrder_TYPE
 * raw_url: rateOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 * @param rate -
 */


exports.cancelOrderURL = cancelOrderURL;

const rateOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/rate/{rate}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.rateOrder = rateOrder;

const rateOrder_RAW_URL = function () {
  return '/order/{id}/rate/{rate}';
};

exports.rateOrder_RAW_URL = rateOrder_RAW_URL;

const rateOrder_TYPE = function () {
  return 'post';
};

exports.rateOrder_TYPE = rateOrder_TYPE;

const rateOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/rate/{rate}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{rate}', `${parameters['rate']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getReceivingModes
 * url: getReceivingModesURL
 * method: getReceivingModes_TYPE
 * raw_url: getReceivingModes_RAW_URL
 */


exports.rateOrderURL = rateOrderURL;

const getReceivingModes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/receiving-modes';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getReceivingModes = getReceivingModes;

const getReceivingModes_RAW_URL = function () {
  return '/order/receiving-modes';
};

exports.getReceivingModes_RAW_URL = getReceivingModes_RAW_URL;

const getReceivingModes_TYPE = function () {
  return 'get';
};

exports.getReceivingModes_TYPE = getReceivingModes_TYPE;

const getReceivingModesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/receiving-modes';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getPaymentModes
 * url: getPaymentModesURL
 * method: getPaymentModes_TYPE
 * raw_url: getPaymentModes_RAW_URL
 */


exports.getReceivingModesURL = getReceivingModesURL;

const getPaymentModes = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/payment-modes/list';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPaymentModes = getPaymentModes;

const getPaymentModes_RAW_URL = function () {
  return '/order/payment-modes/list';
};

exports.getPaymentModes_RAW_URL = getPaymentModes_RAW_URL;

const getPaymentModes_TYPE = function () {
  return 'get';
};

exports.getPaymentModes_TYPE = getPaymentModes_TYPE;

const getPaymentModesURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/payment-modes/list';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getOrdersNearby
 * url: getOrdersNearbyURL
 * method: getOrdersNearby_TYPE
 * raw_url: getOrdersNearby_RAW_URL
 * @param latitude - Geolocation latitude value.
 * @param longitude - Geolocation longitude value.
 * @param radius - Maximum radius to search for (km).
 * @param keyword - Geolocation keyword value.
 * @param page - Number of pages to skip.
 * @param pageSize - Size of documents on one page.
 */


exports.getPaymentModesURL = getPaymentModesURL;

const getOrdersNearby = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/by-location/nearby';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getOrdersNearby = getOrdersNearby;

const getOrdersNearby_RAW_URL = function () {
  return '/order/by-location/nearby';
};

exports.getOrdersNearby_RAW_URL = getOrdersNearby_RAW_URL;

const getOrdersNearby_TYPE = function () {
  return 'get';
};

exports.getOrdersNearby_TYPE = getOrdersNearby_TYPE;

const getOrdersNearbyURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/by-location/nearby';

  if (parameters['latitude'] !== undefined) {
    queryParameters['latitude'] = parameters['latitude'];
  }

  if (parameters['longitude'] !== undefined) {
    queryParameters['longitude'] = parameters['longitude'];
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

  if (parameters['pageSize'] !== undefined) {
    queryParameters['pageSize'] = parameters['pageSize'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: setOrderMerchant
 * url: setOrderMerchantURL
 * method: setOrderMerchant_TYPE
 * raw_url: setOrderMerchant_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 * @param merchant -
 */


exports.getOrdersNearbyURL = getOrdersNearbyURL;

const setOrderMerchant = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/merchant/{merchant}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.setOrderMerchant = setOrderMerchant;

const setOrderMerchant_RAW_URL = function () {
  return '/order/{id}/merchant/{merchant}';
};

exports.setOrderMerchant_RAW_URL = setOrderMerchant_RAW_URL;

const setOrderMerchant_TYPE = function () {
  return 'post';
};

exports.setOrderMerchant_TYPE = setOrderMerchant_TYPE;

const setOrderMerchantURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/merchant/{merchant}';
  path = path.replace('{id}', `${parameters['id']}`);
  path = path.replace('{merchant}', `${parameters['merchant']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: startOrder
 * url: startOrderURL
 * method: startOrder_TYPE
 * raw_url: startOrder_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.setOrderMerchantURL = setOrderMerchantURL;

const startOrder = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/order/{id}/start';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.startOrder = startOrder;

const startOrder_RAW_URL = function () {
  return '/order/{id}/start';
};

exports.startOrder_RAW_URL = startOrder_RAW_URL;

const startOrder_TYPE = function () {
  return 'post';
};

exports.startOrder_TYPE = startOrder_TYPE;

const startOrderURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/order/{id}/start';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: sendNotification
 * url: sendNotificationURL
 * method: sendNotification_TYPE
 * raw_url: sendNotification_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.startOrderURL = startOrderURL;

const sendNotification = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/notification/send';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.sendNotification = sendNotification;

const sendNotification_RAW_URL = function () {
  return '/notification/send';
};

exports.sendNotification_RAW_URL = sendNotification_RAW_URL;

const sendNotification_TYPE = function () {
  return 'post';
};

exports.sendNotification_TYPE = sendNotification_TYPE;

const sendNotificationURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/notification/send';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getNotifications
 * url: getNotificationsURL
 * method: getNotifications_TYPE
 * raw_url: getNotifications_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.sendNotificationURL = sendNotificationURL;

const getNotifications = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/notification';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getNotifications = getNotifications;

const getNotifications_RAW_URL = function () {
  return '/notification';
};

exports.getNotifications_RAW_URL = getNotifications_RAW_URL;

const getNotifications_TYPE = function () {
  return 'get';
};

exports.getNotifications_TYPE = getNotifications_TYPE;

const getNotificationsURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/notification';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getNotification
 * url: getNotificationURL
 * method: getNotification_TYPE
 * raw_url: getNotification_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.getNotificationsURL = getNotificationsURL;

const getNotification = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/notification/{id}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getNotification = getNotification;

const getNotification_RAW_URL = function () {
  return '/notification/{id}';
};

exports.getNotification_RAW_URL = getNotification_RAW_URL;

const getNotification_TYPE = function () {
  return 'get';
};

exports.getNotification_TYPE = getNotification_TYPE;

const getNotificationURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/notification/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: accessWithFacebook
 * url: accessWithFacebookURL
 * method: accessWithFacebook_TYPE
 * raw_url: accessWithFacebook_RAW_URL
 * @param accessToken - User access token returned from Facebook oauth.
 */


exports.getNotificationURL = getNotificationURL;

const accessWithFacebook = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/oauth/access/facebook';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['accessToken'] !== undefined) {
    queryParameters['access_token'] = parameters['accessToken'];
  }

  if (parameters['accessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: accessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.accessWithFacebook = accessWithFacebook;

const accessWithFacebook_RAW_URL = function () {
  return '/oauth/access/facebook';
};

exports.accessWithFacebook_RAW_URL = accessWithFacebook_RAW_URL;

const accessWithFacebook_TYPE = function () {
  return 'post';
};

exports.accessWithFacebook_TYPE = accessWithFacebook_TYPE;

const accessWithFacebookURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/oauth/access/facebook';

  if (parameters['accessToken'] !== undefined) {
    queryParameters['access_token'] = parameters['accessToken'];
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: addPicture
 * url: addPictureURL
 * method: addPicture_TYPE
 * raw_url: addPicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param files - path of the file to update
 */


exports.accessWithFacebookURL = accessWithFacebookURL;

const addPicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
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

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addPicture = addPicture;

const addPicture_RAW_URL = function () {
  return '/picture/save';
};

exports.addPicture_RAW_URL = addPicture_RAW_URL;

const addPicture_TYPE = function () {
  return 'post';
};

exports.addPicture_TYPE = addPicture_TYPE;

const addPictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/save';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getPicture
 * url: getPictureURL
 * method: getPicture_TYPE
 * raw_url: getPicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.addPictureURL = addPictureURL;

const getPicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/{id}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getPicture = getPicture;

const getPicture_RAW_URL = function () {
  return '/picture/{id}';
};

exports.getPicture_RAW_URL = getPicture_RAW_URL;

const getPicture_TYPE = function () {
  return 'get';
};

exports.getPicture_TYPE = getPicture_TYPE;

const getPictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getLatest
 * url: getLatestURL
 * method: getLatest_TYPE
 * raw_url: getLatest_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param itemId -
 */


exports.getPictureURL = getPictureURL;

const getLatest = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/{itemId}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getLatest = getLatest;

const getLatest_RAW_URL = function () {
  return '/picture/{itemId}';
};

exports.getLatest_RAW_URL = getLatest_RAW_URL;

const getLatest_TYPE = function () {
  return 'get';
};

exports.getLatest_TYPE = getLatest_TYPE;

const getLatestURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/{itemId}';
  path = path.replace('{itemId}', `${parameters['itemId']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: removePicture
 * url: removePictureURL
 * method: removePicture_TYPE
 * raw_url: removePicture_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param id -
 */


exports.getLatestURL = getLatestURL;

const removePicture = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/picture/remove/{id}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.removePicture = removePicture;

const removePicture_RAW_URL = function () {
  return '/picture/remove/{id}';
};

exports.removePicture_RAW_URL = removePicture_RAW_URL;

const removePicture_TYPE = function () {
  return 'post';
};

exports.removePicture_TYPE = removePicture_TYPE;

const removePictureURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/picture/remove/{id}';
  path = path.replace('{id}', `${parameters['id']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: createUser
 * url: createUserURL
 * method: createUser_TYPE
 * raw_url: createUser_RAW_URL
 * @param user - JSON representation of the user to be created.
 */


exports.removePictureURL = removePictureURL;

const createUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
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

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.createUser = createUser;

const createUser_RAW_URL = function () {
  return '/user/create';
};

exports.createUser_RAW_URL = createUser_RAW_URL;

const createUser_TYPE = function () {
  return 'post';
};

exports.createUser_TYPE = createUser_TYPE;

const createUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/create';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: isUniqueUsername
 * url: isUniqueUsernameURL
 * method: isUniqueUsername_TYPE
 * raw_url: isUniqueUsername_RAW_URL
 * @param username -
 */


exports.createUserURL = createUserURL;

const isUniqueUsername = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/username/exists/{username}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters['username'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: username'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.isUniqueUsername = isUniqueUsername;

const isUniqueUsername_RAW_URL = function () {
  return '/user/username/exists/{username}';
};

exports.isUniqueUsername_RAW_URL = isUniqueUsername_RAW_URL;

const isUniqueUsername_TYPE = function () {
  return 'get';
};

exports.isUniqueUsername_TYPE = isUniqueUsername_TYPE;

const isUniqueUsernameURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/username/exists/{username}';
  path = path.replace('{username}', `${parameters['username']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: getUserProfile
 * url: getUserProfileURL
 * method: getUserProfile_TYPE
 * raw_url: getUserProfile_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 */


exports.isUniqueUsernameURL = isUniqueUsernameURL;

const getUserProfile = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/profile';
  let body;
  let queryParameters = {};
  let form = {};

  if (parameters['xAccessToken'] !== undefined) {
    config.headers['x-access-token'] = parameters['xAccessToken'];
  }

  if (parameters['xAccessToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xAccessToken'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('get', domain + path, body, queryParameters, form, config);
};

exports.getUserProfile = getUserProfile;

const getUserProfile_RAW_URL = function () {
  return '/user/profile';
};

exports.getUserProfile_RAW_URL = getUserProfile_RAW_URL;

const getUserProfile_TYPE = function () {
  return 'get';
};

exports.getUserProfile_TYPE = getUserProfile_TYPE;

const getUserProfileURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/profile';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};

const updateUser = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/update';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.updateUser = updateUser;

const updateUser_RAW_URL = function () {
  return '/user/update';
};

exports.updateUser_RAW_URL = updateUser_RAW_URL;

const updateUser_TYPE = function () {
  return 'post';
};

exports.updateUser_TYPE = updateUser_TYPE;

const updateUserURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/update';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: recoverPassword
 * url: recoverPasswordURL
 * method: recoverPassword_TYPE
 * raw_url: recoverPassword_RAW_URL
 * @param email -
 */


exports.updateUserURL = updateUserURL;

const recoverPassword = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/password/recover/{email}';
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace('{email}', `${parameters['email']}`);

  if (parameters['email'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: email'));
  }

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.recoverPassword = recoverPassword;

const recoverPassword_RAW_URL = function () {
  return '/user/password/recover/{email}';
};

exports.recoverPassword_RAW_URL = recoverPassword_RAW_URL;

const recoverPassword_TYPE = function () {
  return 'post';
};

exports.recoverPassword_TYPE = recoverPassword_TYPE;

const recoverPasswordURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/password/recover/{email}';
  path = path.replace('{email}', `${parameters['email']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: updatePassword
 * url: updatePasswordURL
 * method: updatePassword_TYPE
 * raw_url: updatePassword_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param user - User credentials object.
 */


exports.recoverPasswordURL = recoverPasswordURL;

const updatePassword = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/password/update';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.updatePassword = updatePassword;

const updatePassword_RAW_URL = function () {
  return '/user/password/update';
};

exports.updatePassword_RAW_URL = updatePassword_RAW_URL;

const updatePassword_TYPE = function () {
  return 'post';
};

exports.updatePassword_TYPE = updatePassword_TYPE;

const updatePasswordURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/password/update';

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};
/**
 *
 * request: addSkip
 * url: addSkipURL
 * method: addSkip_TYPE
 * raw_url: addSkip_RAW_URL
 * @param xAccessToken - JWT created on user creation or authentication.
 * @param skip - User step in order to skip.
 */


exports.updatePasswordURL = updatePasswordURL;

const addSkip = function (parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  const config = parameters.$config || {
    headers: {}
  };
  let path = '/user/skips/{skip}';
  let body;
  let queryParameters = {};
  let form = {};

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
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  return request('post', domain + path, body, queryParameters, form, config);
};

exports.addSkip = addSkip;

const addSkip_RAW_URL = function () {
  return '/user/skips/{skip}';
};

exports.addSkip_RAW_URL = addSkip_RAW_URL;

const addSkip_TYPE = function () {
  return 'post';
};

exports.addSkip_TYPE = addSkip_TYPE;

const addSkipURL = function (parameters = {}) {
  let queryParameters = {};
  const domain = parameters.$domain ? parameters.$domain : getDomain();
  let path = '/user/skips/{skip}';
  path = path.replace('{skip}', `${parameters['skip']}`);

  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
  }

  let keys = Object.keys(queryParameters);
  return domain + path + (keys.length > 0 ? '?' + keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&') : '');
};

exports.addSkipURL = addSkipURL;
