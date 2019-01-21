import request from "../utils/request";

export function delLog(id) {
  return request(`role/${id}`, {
    method: 'DELETE',
  })
}

export function queryLog(type) {
  switch (type.type) {
    case 'adminLog':
      return request(`admin_log?page_size=${type.pageSize}`);
    case 'userLog':
      return request(`user_log?page_size=${type.pageSize}`);
    case 'opLog':
      return request(`op_log?page_size=${type.pageSize}`);
    default:
      break;
  }
}
