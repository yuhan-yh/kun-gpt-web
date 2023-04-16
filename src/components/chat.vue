<!--
 * @Author: your name
 * @Date: 2023-02-07 10:16:46
 * @LastEditTime: 2023-04-16 19:08:48
 * @LastEditors: yuhan
 * @Description: 
 * @FilePath: \kun-gpt-web\src\components\chat.vue
-->
<template>
  <div class="chat-index">
    <a-card>
      <div class="container">
        <div class="container-header">
          <!-- <span>当前模型：gpt-3.5-turbo(每次消耗2积分)</span> -->
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{
                isGlobalSetting?.activeModel
                  ? `${isGlobalSetting.activeModel.label}`
                  : ""
              }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu @click="handleChangeModel">
                <a-menu-item v-for="model in models" :key="model.id">
                  {{ `${model.label}` }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="chat-box">
          <div
            class="line"
            v-for="(msgItem, msgIndex) in msgList"
            :key="msgIndex"
          >
            <div :class="msgItem.role">
              <a-avatar class="line-left" size="large">
                <template #icon>
                  <a-image
                    v-if="msgItem.role === 'assistant'"
                    :src="chatgptIcon"
                    :preview="false"
                  />
                  <UserOutlined v-else />
                </template>
              </a-avatar>
              <div class="line-right" v-html="msgItem.content"></div>
            </div>
          </div>
          <p class="loadingBox" v-show="searchForm.loading">
            <loading-outlined /> 回答中...
          </p>
          <p style="text-align: center" v-show="!searchForm.loading">
            <a-button v-if="msgList.length > 1" type="link" @click="reloadMsg"
              >重新发送</a-button
            >
          </p>
        </div>
        <div class="input-box">
          <a-button
            style="margin-right: 10px"
            type="primary"
            shape="circle"
            size="large"
            :disabled="searchForm.loading"
            @click="newSession"
          >
            <template #icon>
              <ClearOutlined />
            </template>
          </a-button>
          <a-input-search
            v-model:value="searchForm.userInput"
            placeholder="有问题尽管问我..."
            @search="sendMsg"
            @pressEnter="sendMsg"
            :allowClear="true"
            size="large"
            style="max-width: 800px"
          >
            <template #enterButton>
              <a-button type="primary" :disabled="searchForm.loading">
                发送
              </a-button>
            </template>
          </a-input-search>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
// import { v4 as uuidv4 } from "uuid";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; //样式
import { getFormDataUrl } from "@/utils/index.js";
import {
  UserOutlined,
  ClearOutlined,
  LoadingOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import chatgptIcon from "../assets/logo-default.png";
import { message } from "ant-design-vue";
import apiUrl from "@/api/index.js";
import { useUserStore } from "@/stores/user.js";
import { useGlobalSetting } from "@/stores/globalSetting.js";
import { models } from "@/utils/setting.js";
const isUserStore = useUserStore();
const isGlobalSetting = useGlobalSetting();
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
        // eslint-disable-next-line no-empty
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
const searchForm = ref({
  loading: false,
  userInput: "", // 用户输入
  // sessionId: "", // 会话id
});
// 消息列表
const msgList = ref([]);
// 创建新会话
const newSession = () => {
  msgList.value = [
    {
      role: "assistant",
      content: "你好，这是坤必答，请文明提问！切勿提问敏感内容！",
    },
  ];
  searchForm.value.userInput = "";
  // searchForm.value.sessionId = uuidv4();
};

const addMessage = (message, sender) => {
  const newMsg = {
    role: sender,
    content: md.render(message),
  };
  // if (sender === 'assistant' && ) {

  // }
  msgList.value.push(newMsg);
};

async function getResponse(msg) {
  searchForm.value.loading = true;
  let data = {
    // gptRq: {
    // eslint-disable-next-line no-undef
    // apiKey: process.env.OPENAI_API_KEY,
    model: isGlobalSetting?.activeModel.value || "gpt-3.5-turbo",
    messages: [...msgList.value.slice(1)],
    // },
    // phoneNumber: isUserStore.telephone,
  };
  if (msg) {
    data.messages.push({
      role: "user",
      content: msg,
    });
  }
  let response = "";

  await getFormDataUrl(
    "post",
    "https://api.openai-proxy.com/v1/chat/completions",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isGlobalSetting.apiKey}`,
      },
    }
  )
    .then((data) => {
      if (data) {
        // const resData = JSON.parse(data);
        response = data.choices[0].message.content;
        // handleGetIntegral();
      }
    })
    .finally(() => {
      searchForm.value.loading = false;
    });
  return response;
}
// 发送消息
const sendMsg = async () => {
  if (!searchForm.value.userInput) {
    return;
  }
  if (!isGlobalSetting.apiKey) {
    message.error("请设置apiKey");
    return;
  }
  const userInput = searchForm.value.userInput || "";
  if (userInput) {
    addMessage(userInput, "user");
    searchForm.value.userInput = "";
    const response = await getResponse(userInput);
    console.log("🚀 ~ file: chat.vue:196 ~ sendMsg ~ response:", response);
    addMessage(response, "assistant");
  }
};

// 重新发送消息
const reloadMsg = async () => {
  const response = await getResponse("");
  addMessage(response, "assistant");
};

// 查询积分
const handleGetIntegral = () => {
  const params = {
    phoneNumber: isUserStore.telephone,
  };
  getFormDataUrl("get", apiUrl.getIntegral, params)
    .then((data) => {
      handleSetIntegral(data);
    })
    .catch(() => {
      message.error("操作失败");
    });
};

// 设置积分
const handleSetIntegral = (data) => {
  if (data) {
    isUserStore.setIntegral(data);
  }
};

const handleChangeModel = (val) => {
  const model = models.find((it) => it.id === val.key);
  if (model && model.id !== isGlobalSetting.activeModel.id) {
    isGlobalSetting.setActiveModel(model);
    newSession();
  }
};
onMounted(() => {
  newSession();
});
</script>
<style lang="scss" scoped>
.chat-index {
  width: 100%;
  height: 100%;
  :deep(.ant-card) {
    height: 100%;
    margin: 0 auto;
    .ant-card-body {
      height: 100%;
      padding: 0;
    }
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .container-header {
      padding: 10px;
      text-align: center;
      span {
        color: rgba(24, 144, 255, 1);
      }
    }
    .chat-box {
      height: 100%;
      flex: 1;
      position: relative;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .line {
        .user,
        .assistant {
          padding: 14px;
          line-height: 24px;
          display: flex;
          .line-left {
            width: 40px;
            margin: 10px;
          }
          .line-right {
            flex: 1;
            line-height: 24px;
            display: flex;
            // align-items: center;
            justify-content: center;
            flex-flow: column;
            :nth-child(n) {
              margin-bottom: 0;
              line-height: calc(100% + 6px);
            }
            :deep(.hljs) {
              padding: 8px !important;
            }
          }
        }
        .user {
        }
        .assistant {
          background-color: rgba(232, 242, 255, 0.7);
        }
      }
      .loadingBox {
        text-align: center;
      }
    }
    .input-box {
      height: 60px;
      text-align: center;
      padding: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
