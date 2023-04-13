/*
 * @Author: your name
 * @Date: 2023-02-17 14:07:54
 * @LastEditTime: 2023-02-22 17:44:14
 * @LastEditors: yuhan
 * @Description: 单独写一个文件初始化，否则request.js这些js文件调用时数据异常,引入Pinia Plugin Persist持久化插件的话，目前这种写法又导致不能正常做持久化
 * @FilePath: \electron-publish-platform\src\stores\index.js
 */

import { createPinia } from "pinia";
const pinia = createPinia();
export default pinia;
