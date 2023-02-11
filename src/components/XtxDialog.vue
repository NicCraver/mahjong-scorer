<script setup lang="ts">
import BackJSON from '~/Lotties/back'
const props = defineProps({
  visible: { type: Boolean, default: false },
})
const emits = defineEmits(['update:visible'])
const close = () => {
  console.log('1111111', 1111111)
  // 修改父组件的数据 visible
  emits('update:visible', false)
}
</script>

<template>
  <div v-if="props.visible" class="xtx-dialog" :class="{ fade: props.visible }">
    <div class="wrapper" :class="{ fade: props.visible }">
      <!-- <div class="header">
        <div @click="close()">
          <svg
            t="1656843540604"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2243"
            width="32"
            height="32"
          >
            <path
              d="M939.880137 487.72513l-782.215258 0 358.804922-318.92975c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.505595-42.367947-2.492774L64.602344 490.13911c-6.407943 5.693676-10.073426 13.858636-10.073426 22.430872s3.665483 16.737196 10.073426 22.430872l411.993309 366.204449c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947L169.687704 548.100196 939.880137 548.100196c16.57449 0 30.011524-13.613042 30.011524-30.187533S956.454628 487.72513 939.880137 487.72513z"
              p-id="2244"
              fill="#8a8a8a"
            />
          </svg>
        </div>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="close" />
      </div> -->
      <div class="body">
        <!-- 自定内容 -->
        <slot />
      </div>
      <div class="footer">
        <svg
          t="1656843540604"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2243"
          width="32"
          height="32"
        >
          <path
            d="M939.880137 487.72513l-782.215258 0 358.804922-318.92975c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.505595-42.367947-2.492774L64.602344 490.13911c-6.407943 5.693676-10.073426 13.858636-10.073426 22.430872s3.665483 16.737196 10.073426 22.430872l411.993309 366.204449c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947L169.687704 548.100196 939.880137 548.100196c16.57449 0 30.011524-13.613042 30.011524-30.187533S956.454628 487.72513 939.880137 487.72513z"
            p-id="2244"
            fill="#000000"
          />
        </svg>
        <!-- <XtxButton type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton type="primary">确认</XtxButton> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}
.xtx-dialog.fade {
  transition: all 0.4s;
  background: rgba(0, 0, 0, 0.3);
}
.wrapper {
}
.header {
  margin-top: 8px;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.body {
  width: calc(100vw - 40px);
  border-radius: 15px;
  height: 70vh;
  overflow: auto;
  margin: 20px;
  /* width: 100%; */
  /* height: 100%; */
  /* display: flex; */
  background: #fff;
  transition: 5s;
  /* width: calc(100vw - 40px); */
  /* padding: 20px; */
}
</style>
