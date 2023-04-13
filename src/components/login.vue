<!--
 * @Author: your name
 * @Date: 2023-03-28 21:53:02
 * @LastEditTime: 2023-04-09 16:06:54
 * @LastEditors: yuhan
 * @Description: 
 * @FilePath: \kunkun-gpt\src\components\login.vue
-->
<template>
  <div class="login">
    <a-modal
      class="loginModal"
      v-model:visible="formState.visible"
      :footer="null"
      :closable="false"
      :maskClosable="false"
      style="width: 400px"
    >
      <h2 style="font-weight: 600; text-align: center">登录</h2>
      <a-form
        :model="formState.data"
        name="loginForm"
        ref="loginForm"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="telephone"
          :rules="[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请正确输入手机号',
            },
          ]"
        >
          <a-input
            placeholder="手机号"
            v-model:value="formState.data.telephone"
          />
        </a-form-item>
        <a-form-item
          name="code"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <a-input-search
            v-model:value="formState.data.code"
            placeholder="请输入验证码"
            @search="handleSendCode"
          >
            <template #enterButton>
              <a-button
                :type="formState.sendCode ? '' : 'primary'"
                :disabled="formState.sendCode"
                :loading="formState.sendCodeLoading"
              >
                <a-statistic-countdown
                  v-if="formState.sendCode"
                  :valueStyle="{ color: '#00000073', fontSize: '14px' }"
                  :value="formState.deadline"
                  format="s 后获取"
                  @finish="formState.sendCode = false"
                  :loading="formState.sendCodeLoading"
                />
                <span v-else>获取验证码</span>
              </a-button>
            </template>
          </a-input-search>
        </a-form-item>
        <a-form-item>
          <a-button
            block
            type="primary"
            html-type="submit"
            :loading="formState.loading"
            :disabled="!(formState.data.telephone&&formState.data.code)"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { message } from "ant-design-vue";
import apiUrl from "@/api/index.js";
import { getFormDataUrl, getRequest } from "@/utils/index.js";
const isUserStore = useUserStore();
// 订阅token变化
isUserStore.$subscribe((mutation, state) => {
  // 无论显示还是关闭登录框，都重置表单
  resetFormStateData();
  // 有token则关闭登录框，token会在未登录或者过期时候置空
  formState.value.visible = !state.token;
});
const loginForm = ref(null);
const formState = ref({
  visible: !isUserStore.token,
  loading: false,
  sendCodeLoading: false, // 防止多次点击
  sendCode: false, // 是否已经发送验证码
  deadline: "",
  data: {
    telephone: "", // 手机号
    code: "", // 验证码
    invitationCode: "", // 邀请码（被谁邀请）
  },
});
const resetFormStateData = () => {
  formState.value.data.telephone = "";
  formState.value.data.code = "";
};
// 发送验证码
const handleSendCode = () => {
  const data = {
    withoutToken: true, // 不传token
    phoneNumber: formState.value.data.telephone,
    invitationCode: formState.value.data.invitationCode,
  };
  loginForm.value
    .validateFields(["telephone"])
    .then(() => {
      formState.value.sendCodeLoading = true;
      getFormDataUrl("post", apiUrl.sendMessage, data)
        .then((data) => {
          message.success("发送成功");
          formState.value.sendCode = true;
          formState.value.deadline = Date.now() + 1000 * 60;
        })
        .finally(() => {
          formState.value.sendCodeLoading = false;
        });
    })
    .catch(() => {
      message.error("请确保正确输入手机号");
    });
};
// 登录
const onFinish = async () => {
  const data = {
    withoutToken: true, // 不传token
    phoneNumber: formState.value.data.telephone,
    verificationCode: formState.value.data.code,
    invitationCode: formState.value.data.invitationCode,
  };
  formState.value.loading = true;
  await getFormDataUrl("post", apiUrl.login, data)
    .then((data) => {
      if (data) {
        message.success("登录成功");
        isUserStore.setUserInfo({
          id: data.gptUser.id,
          telephone: data.gptUser.phoneNumber || "",
          token: data.tokenInfo.tokenValue || "",
        });
        formState.value.visible = false;
      }
    })
    .finally(() => {
      formState.value.loading = false;
    });
};
onMounted(() => {
  if (window.location.search) {
    formState.value.data.invitationCode = getRequest()?.shareCode || "";
  }
});
</script>
<style lang="scss" scoped>
.login {
  .loginModal {
    .title {
      color: aqua;
    }
  }
}
</style>
