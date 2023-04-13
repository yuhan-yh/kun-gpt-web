/*
 * @Author: your name
 * @Date: 2023-02-21 14:22:51
 * @LastEditTime: 2023-04-06 22:10:00
 * @LastEditors: yuhan
 * @Description: 设置sessionStorage和localStorage
 * @FilePath: \kunkun-gpt\src\utils\storage.js
 */
const setSess = (sessName, sessValue) => {
  sessionStorage.setItem(sessName, JSON.stringify(sessValue));
};
const getSess = (sessName) => {
  return JSON.parse(sessionStorage.getItem(sessName));
};

const removeSess = (sessName) => {
  sessionStorage.removeItem(sessName);
};

export { setSess, getSess, removeSess };

export function localGet(key) {
  const value = window.localStorage.getItem(key);
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return value;
  }
}

export function localSet(key, value) {
  window.localStorage.setItem(key, String(value));
}

export function localRemove(key) {
  window.localStorage.removeItem(key);
}
