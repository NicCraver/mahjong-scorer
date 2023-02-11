<script setup>
import { mainStore } from '~/store'
import { avatarList } from '~/Lotties'

const props = defineProps({
  isRounded: {
    type: Boolean,
    default: true,
  },
})
const store = mainStore()

const router = useRouter()
const goChooseAvatar = () => {
  router.push('/avatar')
}
</script>

<template>
  <div v-for="v in avatarList" :key="v.name" @click="goChooseAvatar">
    <Vue3Lottie
      v-if="v.name === store.avatarName"
      :animation-data="v.value"
      :height="80"
      :width="80"
      b-3
      b-white
      :class="props.isRounded ? 'rounded-36' : ''"
    />
  </div>
</template>

<style scoped>
.avatar-border {
  border: 2px solid #fff;
}
.boxs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: row; */
  /* justify-content: center; */
  align-items: center;
}
.box {
  margin: 10px;
  width: 60px;
  height: 60px;
  /* filter: drop-shadow(0 5px 0 #0c3c7f); */
}
</style>
