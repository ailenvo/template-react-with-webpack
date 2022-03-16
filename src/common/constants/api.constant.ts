const PATH_USER = "/users";
const PATH_CATEGORY = "/category";
const PATH_REPORT_CATEGORY = "/reportCategory";
const PATH_REPORT = "/report";
const PATH_COMMON = "/common";
const PATH_AUTH = "/auth";
const PATH_FILE = "/files";
const PATH_NOTIFICATIONS = "/notifications";
const PATH_DEPARTMENT = "/department";
const PATH_VALUE = "/value";
const PATH_PERMISSION = "/permission";

const USER = {
  UPDATE_INFOS: {
    url: `${PATH_USER}/update-infos`,
  },
  ADMIN_INFOS: {
    url: `${PATH_USER}/infos`,
  },
  UPDATE_AVATAR: {
    url: `${PATH_USER}/avatar`,
    isAuthorization: true,
  },
  UPDATE_PASSWORD: {
    url: `${PATH_USER}/password`,
    isAuthorization: true,
  },
};

const CATEGORY = {
  GET_LIST: {
    url: `${PATH_CATEGORY}/getList`,
  },
  GET_PAGING: {
    url: `${PATH_CATEGORY}/getPaging`,
  },
  UPDATE: {
    url: `${PATH_CATEGORY}/update`,
  },
  CREATE: {
    url: `${PATH_CATEGORY}/create`,
  },
  DELETE: {
    url: `${PATH_CATEGORY}/delete`,
  },
  DELETE_MULTIPLE: {
    url: `${PATH_CATEGORY}/deleteMultiple`,
  },
};

const REPORT_CATEGORY = {
  GET_LIST: {
    url: `${PATH_REPORT_CATEGORY}/getList`,
  },
  GET_PAGING: {
    url: `${PATH_REPORT_CATEGORY}/getPaging`,
  },
  UPDATE: {
    url: `${PATH_REPORT_CATEGORY}/update`,
  },
  CREATE: {
    url: `${PATH_REPORT_CATEGORY}/create`,
  },
  DELETE: {
    url: `${PATH_REPORT_CATEGORY}/delete`,
  },
  DELETE_MULTIPLE: {
    url: `${PATH_REPORT_CATEGORY}/deleteMultiple`,
  },
  GET_GROUP_PAGING: {
    url: `${PATH_REPORT_CATEGORY}/group/getPaging`,
  },
  UPDATE_GROUP: {
    url: `${PATH_REPORT_CATEGORY}/group/update`,
  },
  CREATE_GROUP: {
    url: `${PATH_REPORT_CATEGORY}/group/create`,
  },
  DELETE_GROUP: {
    url: `${PATH_REPORT_CATEGORY}/group/delete`,
  },
  DELETE_MULTIPLE_GROUP: {
    url: `${PATH_REPORT_CATEGORY}/group/delete`,
  },
};

const REPORT = {
  GET_LIST: {
    url: `${PATH_REPORT}/getList`,
  },
  GET_PAGING: {
    url: `${PATH_REPORT}/getPaging`,
  },
  UPDATE: {
    url: `${PATH_REPORT}/update`,
  },
  CREATE: {
    url: `${PATH_REPORT}/create`,
  },
  DELETE: {
    url: `${PATH_REPORT}/delete`,
  },
  DELETE_MULTIPLE: {
    url: `${PATH_REPORT}/deleteMultiple`,
  },
  IMPORT: {
    url: `${PATH_REPORT}/import`,
    isAuthorization: true,
  },
  GET_TEMPLATE_IMPORT: {
    url: `${PATH_REPORT}/template`,
    isAuthorization: true,
  },
};

const COMMON = {
  GET_ORDER_ID: {
    url: `${PATH_COMMON}/order`,
  },
};

const AUTH = {
  LOGIN: {
    url: `${PATH_AUTH}/admin/login`,
  },
  GET_USERS: {
    url: `${PATH_AUTH}/admin/users`,
    isAuthorization: true,
  },
  UPDATE_USER: {
    url: `${PATH_AUTH}/admin`,
    isAuthorization: true,
  },
  UPDATE_USER_PASSWORD: {
    url: `${PATH_AUTH}/admin/update/password`,
    isAuthorization: true,
  },
  UPDATE_DEPARTMENT_FOR_USER: {
    url: `${PATH_AUTH}/admin/update/departmentForUsers`,
    isAuthorization: true,
  },
  DELETE: {
    url: `${PATH_AUTH}/users`,
    isAuthorization: true,
  },
  REPORT: {
    url: `${PATH_AUTH}/reports`,
    isAuthorization: true,
  },
};

const FILE = {
  GET_FILES: {
    url: `${PATH_FILE}`,
  },
  UPLOAD: {
    url: `${PATH_FILE}/upload`,
  },
  DELETE_FILE: {
    url: `${PATH_FILE}`,
  },
};

const NOTIFICATIONS = {
  GETS: {
    url: `${PATH_NOTIFICATIONS}`,
    isAuthorization: true,
  },
  CREATE: {
    url: `${PATH_NOTIFICATIONS}`,
    isAuthorization: true,
  },
  UPDATE: {
    url: `${PATH_NOTIFICATIONS}`,
    isAuthorization: true,
  },
  DELETE: {
    url: `${PATH_NOTIFICATIONS}`,
    isAuthorization: true,
  },
  PUSH_NOTIFICATION: {
    url: `${PATH_NOTIFICATIONS}/send`,
    isAuthorization: true,
  },
};

const DEPARTMENT = {
  GET_LIST: {
    url: `${PATH_DEPARTMENT}/getList`,
  },
  GET_PAGING: {
    url: `${PATH_DEPARTMENT}/getPaging`,
  },
  UPDATE: {
    url: `${PATH_DEPARTMENT}/update`,
  },
  CREATE: {
    url: `${PATH_DEPARTMENT}/create`,
  },
  DELETE: {
    url: `${PATH_DEPARTMENT}/delete`,
  },
};

const VALUE = {
  GET_LIST: {
    url: `${PATH_VALUE}/getList`,
  },
  GET_PAGING: {
    url: `${PATH_VALUE}/getPaging`,
  },
  UPDATE: {
    url: `${PATH_VALUE}/update`,
  },
  CREATE: {
    url: `${PATH_VALUE}/create`,
  },
  DELETE: {
    url: `${PATH_VALUE}/delete`,
  },
};

const PERMISSION = {
  GET_LIST: {
    url: `${PATH_PERMISSION}/getList`,
  },
  GET_PAGING: {
    url: `${PATH_PERMISSION}/getPaging`,
  },
  UPDATE: {
    url: `${PATH_PERMISSION}/update`,
  },
  CREATE: {
    url: `${PATH_PERMISSION}/create`,
  },
  DELETE: {
    url: `${PATH_PERMISSION}/delete`,
  },
};

const ApiConstant = {
  VALUE,
  USER,
  REPORT,
  REPORT_CATEGORY,
  CATEGORY,
  COMMON,
  AUTH,
  FILE,
  NOTIFICATIONS,
  DEPARTMENT,
  PERMISSION,
};

export default ApiConstant;
