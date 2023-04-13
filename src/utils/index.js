/*
 * @Author: your name
 * @Date: 2023-04-05 23:20:07
 * @LastEditTime: 2023-04-13 16:14:11
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kun-gpt-web\src\utils\index.js
 */
import axios from "@/utils/request";
import { message } from "ant-design-vue";
import pinia from "@/stores";
import { useUserStore } from "@/stores/user.js";
const isUserStore = useUserStore(pinia);
/**
 * 封装的请求方法
 */
export const getFormDataUrl = (type, baseUrl, formInfo, options = {}) => {
  const api = {
    url: `${baseUrl}`,
    method: type,
    params: formInfo || "",
    headers: {
      //   "Content-Type": `multipart/form-data`,
      satoken: isUserStore.getToken || "",
    },
    data: formInfo || "",
    // timeout: 20000,
  };
  if (options?.headers) {
    api.headers = {
      ...api.headers,
      ...options.headers,
    };
  }
  //   if (Object.prototype.hasOwnProperty.call(options, "timeout")) {
  //     api.timeout = options.timeout;
  //   }
  if (type === "post") {
    if (api.data?.withoutToken) {
      delete api.data.withoutToken;
      delete api.headers.satoken;
    }
    delete api.params;
  }
  if (type === "get") {
    if (api.params?.withoutToken) {
      delete api.params.withoutToken;
      delete api.headers.satoken;
    }
    delete api.data;
  }
  return new Promise((resolve, reject) => {
    axios(api)
      .then((res) => {
        // if ([0, 200].includes(res.code)) {
        resolve(res);
        // } else if (res.code === 500) {
        //   message.error(res?.msg || "登录过期，请重新登录");
        //   // 置空用户信息和token，登录框则出来
        //   isUserStore.setUserInfo({
        //     telephone: "",
        //     token: "",
        //   });
        // } else {
        //   message.error(res?.msg || "请求失败");
        //   reject(res?.msg || "请求失败");
        // }
      })
      .catch((err) => {
        // message.error(err?.msg || err || "请求失败");
        reject(err?.msg || err || "请求失败");
      });
  });
};
// 处理地址栏参数
export function getRequest() {
  var url = window.location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
