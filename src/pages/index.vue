<template>
  <div>
    <header pl-10 pt-5 pb-5>
      <p text="4xl left">
        Mahjong
      </p>
      <p text="4xl left" pt-2>
        <span>Scoring</span>
        <span pl-4>Device</span>
      </p>
    </header>
    <div w-100px h-100px text-center m-auto>
      <SvgIcon :name="userInfo.avatarName" w-100px h-100px />
    </div>
    <div flex mt-5>
      <div
        w-90vw
        py-4
        px-4
        mx-auto
        bg-white
        dark:bg-gray-400
        dark:bg-opacity-10
        rounded-xl
        shadow-md
        space-y-2
      >
        <div text-center space-y-2>
          <div>
            <p text-main>
              快速开始
            </p>
            <p text-left text-gray-500 dark:text-gray-300 font-medium pb-3>
              Quick Start
            </p>
          </div>
          <div flex justify-between px-8>
            <button btn-main @click="addRoom()">
              我要开房间
            </button>
            <button btn @click="joinRoom()">
              加入房间
            </button>
          </div>
        </div>
      </div>
    </div>
    <div flex m-t-5>
      <div
        w-90vw
        py-4
        px-4
        mx-auto
        bg-white
        dark:bg-gray-400
        dark:bg-opacity-10
        rounded-xl
        shadow-md
        space-y-2
      >
        <div text-center space-y-2>
          <div>
            <p text-lg text-left text-black dark:text-white font-semibold mb-2>
              最近一个房间
            </p>
            <p text-left text-gray-500 dark:text-gray-300 font-medium>
              Nearest Room
            </p>
          </div>
          <div v-if="!roomNum" px-8>
            <div text-gray-500 dark:text-gray-300 text-center text-4 m-b-5>
              尚无进行中的游戏
            </div>
          </div>
          <div v-else>
            <div px-4>
              <div text-lg text-black dark:text-white font-semibold pb-3>
                {{ roomNum }}
              </div>
              <button btn-main @click="goPlay">
                进入
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { closeNotify, showNotify } from 'vant'
import 'vant/es/notify/style'
import { mainStore } from '~/store'
const indexStore = mainStore()
const { userInfo, roomID } = storeToRefs(indexStore)
let roomNum = $ref('')

const router = useRouter()

// 创建房间
const addRoom = () => {
  // 如果有id 提示无法创建
  if (roomNum !== '') {
    console.log('玩家已进入房间,为您自动加入房间！')
    showNotify({ type: 'danger', message: '玩家已进入房间,为您自动加入房间！' })
  }
  setTimeout(() => {
    closeNotify()
    router.push('/play')
  }, 300)
}

// 加入房间
const joinRoom = () => {
  router.push('/joinRoom')
}

// 获取room信息
const getRoomInfo = async () => {
  const gameID = await useGetRoomIDByPlayerID(useGetUserID())
  console.log('gameID', gameID)
  if (gameID !== '') {
    console.log('存在进行中的房间', gameID !== '')
    indexStore.setRoomID(gameID)
    console.log('roomID', roomID)
    const data = await useGetRoomInfoByRoomID(roomID.value)
    roomNum = data.roomNum
  }
  else {
    console.log('不存在进行中的房间', gameID !== '')
  }
}

const goPlay = async () => {
  const { isIng } = await useGetUserInfoByPlayerID(useGetUserID())
  console.log('isIng', isIng)
  // 如果在进行中 则跳转到 playing
  if (isIng)
    router.push('/playing')
  else
    router.push('/play')
}

onMounted(async () => {
  if (isEmptyStr(userInfo.value.userID)) {
    router.replace('/login')
    return
  }
  await getRoomInfo()
})
</script>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped>
.btn {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}
</style>
