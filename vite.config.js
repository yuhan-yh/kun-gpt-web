/*
 * @Author: your name
 * @Date: 2023-02-07 10:13:01
 * @LastEditTime: 2023-04-05 20:35:36
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kunkun-gpt\vite.config.js
 */
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  define: {
    // eslint-disable-next-line no-undef
    "process.env": {
      // eslint-disable-next-line no-undef
      ...process.env,
      OPENAI_API_KEY: "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",
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 6300, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    host: "0.0.0.0",
    hmr: true, // 热刷新
    // proxy: {
    //   "/baseUrl": {
    //     target: "http://172.16.3.209:8088",
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(`/baseUrl`, ""),
    //   },
    // },
  },
});
