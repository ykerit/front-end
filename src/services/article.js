import request from "../utils/request";

export function createArticle(values) {
  return request('article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export async function createComment(values) {
  return request('comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
}

export function queryArticle(id) {
  return request(`article/${id}`)
}

export function queryAllArticle(page_size) {
  return request(`article?page_size=${page_size}`)
}
export function queryCurrentUserArticle(query) {
  return request(`user_article/${query.id}?page_size=${query.page_size}`)
}

export async function queryComment(value) {
  return request(`comment?article=${value.article}&page_size=${value.page_size}`)
}

export function queryTimeLine() {
  return request('filed')
}

export function delArticle(id) {
  return request(`article/${id}`, {
    method: 'DELETE',
  })
}
