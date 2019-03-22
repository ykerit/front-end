import request from "../utils/request";

export function queryAllClass() {
  return request('classification')
}

export function queryArticleList(id) {
  return request(`classification/${id}`)
}
