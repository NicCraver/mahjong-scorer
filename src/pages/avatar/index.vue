<script setup>
import { mainStore } from '~/store'
import { avatarList } from '~/Lotties'
const router = useRouter()

const activeValue = ref(0)
const store = mainStore()
activeValue.value = store.avatarName
const changeAvatar = (value) => {
  activeValue.value = value
  router.go(-1)
}
</script>

<template>
  <div p-t-20>
    <Starport port="my-id" style="height: 120px">
      <AvatarCom />
    </Starport>
    <div flex flex-wrap justify-center>
      <div
        v-for="v in avatarList"
        :key="v.name"
        w-20
        h-20
        m-2
        :height="90"
        :width="90"
        rounded-36
        :class="{ avatar: v.name === activeValue }"
        @click="changeAvatar(v.name)"
      >
        <Vue3Lottie :animation-data="v.value" rounded-36 />
      </div>
      <!-- <div
        v-for="v in list"
        :key="v.index"
      >
        <Vue3Lottie :animation-data="v.value" rounded-36 />
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  // height: 200px;
  position: relative;
  // width: 200px;
}

@keyframes cycle-colors {
  0% {
    border-color: hsl(0, 58%, 55%);
  }
  25% {
    border-color: hsl(90, 100%, 50%);
  }
  50% {
    border-color: hsl(180, 100%, 50%);
  }
  75% {
    border-color: hsl(270, 100%, 50%);
  }
  100% {
    border-color: hsl(360, 100%, 50%);
  }
}
// @keyframes cycle-colors {
//   0% {
//     border-color: #E36F90;
//   }
//   25% {
//     border-color: #A0E0DC;
//   }
//   50% {
//     border-color: #C1DEF8;
//   }
//   75% {
//     border-color: #CCC4F8;
//   }
//   100% {
//     border-color: #E36F90;
//   }
// }

@keyframes pulse {
  to {
    opacity: 0;
    transform: scale(1);
  }
}

.avatar::before,
.avatar::after {
  animation: pulse 2s linear infinite;
  border: #fff solid 5px;
  border-radius: 9999px;
  box-sizing: border-box;
  content: ' ';
  height: 140%;
  left: -20%;
  opacity: 0.6;
  position: absolute;
  top: -20%;
  transform: scale(0.714);
  width: 140%;
  z-index: 1;
}

.avatar::after {
  animation-delay: 1s;
}

.avatar:hover::before,
.avatar:hover::after {
  animation: pulse 1s linear infinite, cycle-colors 6s linear infinite;
}

.avatar:hover::after {
  animation-delay: 0.5s;
}

.gradientBorder {
  --borderWidth: 6px;
  background: #1d1f20;
  position: relative;
  border-radius: 9rem;
}
.gradientBorder:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  border-radius: 9rem;
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
