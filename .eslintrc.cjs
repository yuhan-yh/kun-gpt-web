/*
 * @Author: your name
 * @Date: 2023-03-24 23:15:01
 * @LastEditTime: 2023-03-28 22:00:39
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kunkun-gpt\.eslintrc.cjs
 */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
