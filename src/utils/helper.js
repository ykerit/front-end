export function setlocalStorage(key,value){
  localStorage.setItem(key, value);
}
export function getlocalStorage(key){
  return localStorage.getItem(key);
}
export function dellocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('id');
}
export function checklocalStorage(){
  return getlocalStorage('token') != null;
}
