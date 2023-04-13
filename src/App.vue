<!--
 * @Author: your name
 * @Date: 2023-02-07 10:13:01
 * @LastEditTime: 2023-04-13 11:41:39
 * @LastEditors: yuhan
 * @Description: 
 * @FilePath: \kun-gpt-web\src\App.vue
-->
<script setup>
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import OperationBox from "./components/operationBox.vue";
import Chat from "./components/chat.vue";
import Login from "./components/login.vue";
import { useGlobalSetting } from "@/stores/globalSetting.js";
import { onMounted, ref } from "vue";
const isGlobalSetting = useGlobalSetting();
const collapsed = ref(true);
const drawerVisible = ref(false);
const listenClientWidth = () => {
  const W = document.documentElement.clientWidth;
  isGlobalSetting.setIsMobile(!!(W < 1100));
  collapsed.value = isGlobalSetting.isMobile;
};
const handleCollapsed = () => {
  collapsed.value = !collapsed.value;
  if (isGlobalSetting.isMobile && !collapsed.value) {
    drawerVisible.value = true;
  } else {
    drawerVisible.value = false;
  }
};
const handleDrawerClose = () => {
  drawerVisible.value = false;
  collapsed.value = true;
};
window.addEventListener("resize", () => {
  listenClientWidth();
});
onMounted(() => {
  listenClientWidth();
});
</script>

<template>
  <div class="main">
    <a-layout style="width: 100%; height: 100%">
      <a-drawer
        v-if="isGlobalSetting.isMobile"
        v-model:visible="drawerVisible"
        :width="260"
        placement="left"
        @close="handleDrawerClose"
      >
        <OperationBox class="main-left" />
      </a-drawer>
      <a-layout-sider
        v-else
        :style="{
          background: '#fff',
        }"
        :collapsedWidth="0"
        v-model:collapsed="collapsed"
        width="260"
        :trigger="null"
        collapsibles
      >
        <OperationBox class="main-left" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <a-button
            class="collapsedBtn"
            :style="`left: ${collapsed ? '0' : '-12px;'}`"
            shape="circle"
            size="small"
            @click="handleCollapsed"
          >
            <template #icon>
              <right-outlined v-if="collapsed" />
              <left-outlined v-else />
            </template>
          </a-button>
          <Chat class="main-right" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
  <!-- <Login /> -->
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin: 0 auto; */
  .main-left {
    width: 100%;
    height: 100%;
  }
  .collapsedBtn {
    position: absolute;
    top: calc(50% - 12px);
    z-index: 10;
  }
  .main-right {
    flex: 1;
  }
}
</style>
