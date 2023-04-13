/*
 * @Author: your name
 * @Date: 2023-02-09 11:42:55
 * @LastEditTime: 2023-04-08 00:31:21
 * @LastEditors: yuhan
 * @Description:
 * @FilePath: \kunkun-gpt\src\api\index.js
 */
const base = "/kunkun-backend";
const apiUrl = {
    login: `${base}/user/login`, // 登录
    sign: `${base}/integral/sign`, // 签到
    share: `${base}/user/share`, // 分享
    sendMessage: `${base}/message/send`, // 验证码
    getIntegral: `${base}/integral/get`, // 查积分
    sendGpt: `${base}/chat/sendGpt`, // 发送消息
};

export default apiUrl;
