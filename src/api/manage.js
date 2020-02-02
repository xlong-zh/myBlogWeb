import http from '@/router/request';

//post
export function postAction(url, parameter) {
  return http({
    url: url,
    method: 'post',
    data: parameter
  });
}
export function postActionURL(url, parameter) {
  return http({
    url: url,
    method: 'post',
    params: parameter
  });
}

//put
export function putAction(url, parameter) {
  return http({
    url: url,
    method: 'put',
    data: parameter
  });
}

//get
export function getAction(url, parameter) {
  return http({
    url: url,
    method: 'get',
    params: parameter
  });
}

//deleteAction
export function deleteAction(url, parameter) {
  return http({
    url: url,
    method: 'delete',
    params: parameter
  });
}

//post method= {post | put}
export function httpAction(url, parameter, method) {
  return http({
    url: url,
    data: parameter,
    method: method
  });
}
export function getUserList(parameter) {
  return http({
    url: api.user,
    method: 'get',
    params: parameter
  });
}

export function getRoleList(parameter) {
  return http({
    url: api.role,
    method: 'get',
    params: parameter
  });
}

export function getServiceList(parameter) {
  return http({
    url: api.service,
    method: 'get',
    params: parameter
  });
}

export function getPermissions(parameter) {
  return http({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  });
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return http({
    url: api.service,
    method: parameter.id == 0 ? 'post' : 'put',
    data: parameter
  });
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url, parameter) {
  return http({
    url: url,
    params: parameter,
    method: 'get',
    responseType: 'blob'
  });
}
