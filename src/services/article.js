import request from "../utils/request";

export function createArticle(values) {
  console.log(values)
  return request('article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}
export function queryArticle(id) {
  return request(`article/${id}`)
}

export function queryAllArticle(page_size) {
  return request(`article?page_size=${page_size}`)
}
