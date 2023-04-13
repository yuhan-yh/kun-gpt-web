/*
 * @Author: your name
 * @Date: 2023-03-24 23:15:02
 * @LastEditTime: 2023-03-27 23:38:01
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kunkun-gpt\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import pinia from "./stores";
const app = createApp(App);

app.use(pinia);
app.use(Antd);

app.mount("#app");
