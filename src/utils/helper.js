export function setlocalStorage(key,value){
  localStorage.setItem(key, value);
}
export function getlocalStorage(key){
  return localStorage.getItem(key);
}
export function dellocalStorage(key) {
  localStorage.removeItem(key)
}
export function checklocalStorage(){
  if (getlocalStorage('token') != null) {
    return true;
  }
  return false;
}