<template>
  <div class="operationBox">
    <div class="content-top">
      <!-- <div class="menuList">
        <div
          class="menuItem"
          v-for="menu in menuList"
          :key="menu.value"
          @click="operationEntry(menu)"
        >
          <div class="prefixLabel">
            <component :is="menu.icon"></component>
            {{ menu.label }}
          </div>
          <span class="suffixLabel">{{ menu.suffixLabel || "" }}</span>
        </div>
      </div> -->
      <a-input
        v-model:value="apiKey"
        placeholder="apiKey"
        allow-clear
        @change="operationEntry({ value: 'apiKeyChange' })"
      />
    </div>
    <div class="content-bottom"></div>
  </div>
  <!-- <ShareModal
    :visible="shareModal.visible"
    :shareUrl="shareModal.shareUrl"
    @sharemodalcancel="operationEntry({ value: 'cancelShareModal' })"
  /> -->
</template>
<script setup>
import {
  Bookmark as iconBookMark,
  Share as iconShare,
  Finance as iconFinance,
  Logout as iconLogout,
} from "@icon-park/vue-next";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user.js";
import { message } from "ant-design-vue";
import apiUrl from "@/api/index.js";
import { getFormDataUrl } from "@/utils/index.js";
import ShareModal from "@/components/shareModal.vue";
import { useGlobalSetting } from "@/stores/globalSetting.js";
const isUserStore = useUserStore();
const isGlobalSetting = useGlobalSetting();
// const menuList = ref([
//   {
//     value: "sign",
//     label: "签到",
//     suffixLabel: "领10积分",
//     icon: iconBookMark,
//   },
//   {
//     value: "share",
//     label: "分享",
//     suffixLabel: "赚20积分",
//     icon: iconShare,
//   },
//   {
//     value: "integral",
//     label: `积分：${isUserStore.integral}`,
//     icon: iconFinance,
//     suffixLabel: "充值",
//   },
//   {
//     value: "logout",
//     label: "退出",
//     icon: iconLogout,
//     suffixLabel: "",
//   },
// ]);

const apiKey = ref("");

// 操作入口
const operationEntry = (target) => {
  switch (target.value) {
    case "apiKeyChange":
      handleApiKeyChange();
      break;
    //     case "sign":
    //       handleSign();
    //       break;
    //     case "share":
    //       handleShare();
    //       break;
    //     case "cancelShareModal":
    //       handleCloseShareModal();
    //       break;
    //     case "integral":
    //       handleGetIntegral();
    //       break;
    //     case "logout":
    //       // 置空用户信息和token，登录框则出来
    //       message.success("已退出登录");
    //       isUserStore.setUserInfo({
    //         telephone: "",
    //         token: "",
    //       });
    //       break;
  }
};

const handleApiKeyChange = () => {
  isGlobalSetting.setApiKey(apiKey.value);
};
// 签到
// const handleSign = () => {
//   const params = {
//     phoneNumber: isUserStore.telephone,
//   };
//   getFormDataUrl("get", apiUrl.sign, params)
//     .then((data) => {
//       message.success("签到成功");
//     })
//     .finally(() => {
//       // 刷新积分
//       operationEntry({ value: "integral" });
//     });
// };
// 分享modal
// const shareModal = ref({
//   visible: false,
//   shareUrl: "",
// });
// 分享
// const handleShare = () => {
//   const params = {
//     userId: isUserStore.id || "",
//   };
//   getFormDataUrl("get", apiUrl.share, params)
//     .then((data) => {
//       if (data) {
//         const baseUrl = window.location.href;
//         const shareUrl = `${baseUrl}?shareCode=${data}`;
//         shareModal.value.shareUrl = shareUrl;
//         shareModal.value.visible = true;
//       }
//     })
//     .finally(() => {});
// };
// 关闭分享modal回调
// const handleCloseShareModal = () => {
//   shareModal.value.visible = false;
//   shareModal.value.shareUrl = "";
// };
// 查询积分
// const handleGetIntegral = () => {
//   const params = {
//     phoneNumber: isUserStore.telephone,
//   };
//   getFormDataUrl("get", apiUrl.getIntegral, params)
//     .then((data) => {
//       handleSetIntegral(data);
//     })
//     .catch(() => {
//       message.error("操作失败");
//     });
// };
// 设置积分
// const handleSetIntegral = (data) => {
//   if (data) {
//     isUserStore.setIntegral(data);
//     const targetIndex = menuList.value.findIndex(
//       (it) => it.value === "integral"
//     );
//     menuList.value[targetIndex].label = `积分：${isUserStore.integral}`;
//   }
// };
// watch(
//   () => isUserStore,
//   (nv) => {
//     if (nv?.token) {
//       // 刷新积分信息
//       operationEntry({ value: "integral" });
//     }
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// );
onMounted(() => {
  apiKey.value = isGlobalSetting.apiKey;
});
</script>
<style lang="scss" scoped>
.operationBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content-top {
    height: 100px;
    .menuList {
      .menuItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        margin: 8px 12px;
        background-color: rgb(249, 249, 249);
        border-radius: 4px;
        color: #000000d9;
        line-height: 24px;
        cursor: pointer;
        &:hover {
          background-color: rgb(230, 247, 255);
          color: rgb(24, 144, 255);
        }
        .i-icon {
          display: flex;
          align-items: center;
          padding: 5px;
        }
        .prefixLabel {
          display: flex;
        }
        .suffixLabel {
          float: right;
          font-size: 12px;
          // color: rgb(136, 136, 136);
        }
      }
    }
  }
  .content-bottom {
  }
}
</style>
