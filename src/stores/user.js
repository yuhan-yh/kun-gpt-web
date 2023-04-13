/*
 * @Author: your name
 * @Date: 2023-03-24 23:15:02
 * @LastEditTime: 2023-04-06 00:04:01
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kunkun-gpt\src\stores\user.js
 */
import { defineStore } from "pinia";
import { localGet, localSet } from "@/utils/storage";

// 用户相关
export const useUserStore = defineStore("isUserStore", {
  id: "user",
  state: () => {
    return {
      id: localGet("id"),
      telephone: localGet("telephone") || "", // 手机
      token: localGet("token") || "", // token
      integral: 0, // 积分
    };
  },
  getters: {
    getUserInfo: (state) => {
      return {
        telephone: state.telephone,
        token: state.token,
      };
    },
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    setUserInfo(val) {
      localSet("id", val?.id || "");
      localSet("telephone", val?.telephone || "");
      localSet("token", val?.token || "");
      this.id = localGet("id");
      this.telephone = localGet("telephone");
      this.token = localGet("token");
    },
    setIntegral(val) {
      this.integral = val || 0;
    },
  },
});
