/*
 * @Author: your name
 * @Date: 2023-03-24 23:15:02
 * @LastEditTime: 2023-04-13 11:53:21
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kun-gpt-web\src\stores\globalSetting.js
 */
import { defineStore } from "pinia";
import { models } from "@/utils/setting.js";
// 用户相关
export const useGlobalSetting = defineStore("isGlobalSetting", {
  id: "globalSetting",
  state: () => {
    return {
      activeModel: models?.[0] || null, // 当前模型
      isMobile: false,
      apiKey: "",
    };
  },
  actions: {
    setActiveModel(val) {
      this.activeModel = val || null;
    },
    setIsMobile(val) {
      this.isMobile = !!val;
    },
    setApiKey(val) {
      this.apiKey = val || "";
    },
  },
});
