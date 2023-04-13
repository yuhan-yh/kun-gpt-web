/*
 * @Author: your name
 * @Date: 2021-04-22 17:48:38
 * @LastEditTime: 2023-04-05 23:54:59
 * @LastEditors: yuhan
 * @Description: In User Settings Edit
 * @FilePath: \kunkun-gpt\src\utils\request.js
 */
import Axios from "axios";
import { message } from "ant-design-vue";
import pinia from "@/stores";
import { useUserStore } from "@/stores/user.js";
const isUserStore = useUserStore(pinia);
const baseURL = "/baseUrl";

const axios = Axios.create({
  baseURL,
  timeout: 30000, // 请求超时 30s
});

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    // 默认传token。有withoutToken字段的话不需要传token
    // switch (response.method) {
    //   case "get":
    //     if (response?.params?.withoutToken) {
    //       delete response.params.withoutToken;
    //     } else {
    //       response.headers["satoken"] = isUserStore?.token || "";
    //     }
    //     break;
    //   case "post":
    //     if (response?.data?.withoutToken) {
    //       delete response.data.withoutToken;
    //     } else {
    //       response.headers["satoken"] = isUserStore?.token || "";
    //     }
    //     break;
    // }
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    if ([0, 200].includes(response.status)) {
      // 500且token报错，则重新登录
      // if (response.data?.code === 500) {
      //   // 置空用户信息和token，登录框则出来
      //   isUserStore.setUserInfo({
      //     telephone: "",
      //     token: "",
      //   });
      // }
      return response.data;
    } else {
      message.error(response?.data?.msg || response?.statusText || "请求失败");
      return Promise.reject();
    }
  },
  (error) => {
    message.error(
      error?.message || error?.response0?.data?.message || "请求失败"
    );
    return Promise.reject(error);
  }
);

export default axios;
