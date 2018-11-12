export function getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  }
  
  export function delCookie({ name, domain, path }) {
    if (getCookie(name)) {
      document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' + 
                        path + '; domain=' + 
                        domain;
    }
  }