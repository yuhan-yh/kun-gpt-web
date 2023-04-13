<template>
  <div class="shareModalRef" ref="shareModalRef">
    <a-modal
      :width="340"
      v-model:visible="shareModal.visible"
      title="分享"
      :footer="null"
      @cancel="operationEntry('sharemodalcancel')"
      :getContainer="() => $refs.shareModalRef"
    >
      <div class="share-content" ref="shareContent">
        <div class="header">
          <img class="icon" src="../assets/share-1.png" />
          <!-- <img class="icon" src="@/assets/logo-default.png" /> -->
          <!-- <p class="gradient-text">坤必答GPT智能聊天</p> -->
        </div>
        <qrcode-vue :value="shareModal.shareUrl" :size="200" level="H" />
        <p class="default-text">每天都能免费使用</p>
      </div>
      <div class="btns">
        <a-button type="primary" @click="operationEntry('copyPicture')"
          >保存图片</a-button
        >
        <a-button type="primary" @click="operationEntry('copyUrl')"
          >复制链接</a-button
        >
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import useClipboard from "vue-clipboard3";
import { message } from "ant-design-vue";
import html2canvas from "html2canvas";
const { toClipboard } = useClipboard();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  shareUrl: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["sharemodalcancel"]);
watch(
  () => props,
  (nv) => {
    if (nv) {
      shareModal.value.visible = nv.visible;
      shareModal.value.shareUrl = nv.shareUrl;
    }
  },
  {
    deep: true,
  }
);

const shareContent = ref(null);
const shareModal = ref({
  visible: false,
  shareUrl: "",
});

// 操作入口
const operationEntry = (type) => {
  switch (type) {
    case "sharemodalcancel":
      emits("sharemodalcancel", "");
      break;
    case "copyPicture":
      handleCopyPicture();
      break;
    case "copyUrl":
      handleCopyUrl();
      break;
  }
};
// 复制图片
const handleCopyPicture = () => {
  let shareContentHTML = shareContent.value;
  html2canvas(shareContentHTML, {
    // backgroundColor: "#f5f5f5", //海报的背景颜色
    scale: 1,
    allowTaint: true,
    useCORS: true, // 允许跨域
    width: shareContentHTML.clientWidth, //生成海报的w
    height: shareContentHTML.clientHeight, //生成海报的h    默认是px
  }).then((canvas) => {
    // canvas 其实就是我们所讲的res 的意思 返回报文的意思
    let baseImg = canvas.toDataURL("image/png", 1);
    shareContentHTML = baseImg;
    let save = document.createElement("a");
    // <a href=''></a>
    save.href = baseImg;
    // 下载的名字
    save.download = "分享";
    // 直接回调a的点击事件
    save.click();
    save.remove();
  });
};
// 复制url
const handleCopyUrl = async () => {
  console.log("handleCopy", shareModal.value.shareUrl);
  try {
    await toClipboard(shareModal.value.shareUrl);
    message.success("复制成功");
  } catch (e) {
    console.error(e);
    message.error("复制失败");
  }
};
</script>
<style lang="scss" scoped>
.shareModalRef {
  :deep(.ant-modal) {
    .ant-modal-body {
      padding: 20px;
      .share-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
          .icon {
            width: 220px;
            height: 50px;
            // width: 40px;
            // height: 40px;
            // border-radius: 50%;
          }
          // .gradient-text {
          //   font-size: 18px;
          //   font-weight: 600;
          //   padding-left: 10px;
          //   // background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
          //   background-image: linear-gradient(to top, #89f7fe 0%, #66a6ff 100%);
          //   background-clip: text;
          //   -webkit-background-clip: text;
          //   color: transparent; /*需要文字透明*/
          //   margin-bottom: 0;
          // }
        }

        .default-text {
          margin: 10px 0;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .btns {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>
