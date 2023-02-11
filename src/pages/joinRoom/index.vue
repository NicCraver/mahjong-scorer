<!--
 * @Author: Nic
 * @Date: 2022-09-12 08:27:33
 * @LastEditTime: 2023-02-01 21:50:40
 * @LastEditors: Nic
 * @Description: 加入房间
 * @FilePath: /mahjong-scorer/src/pages/joinRoom/index.vue
-->
<template>
  <div>
    <header pl-10 pt-10 pb-10>
      <p text="4xl left">
        请输入房间号
      </p>
    </header>
    <div mt-4>
      <!-- 密码输入框 -->
      <van-password-input
        :value="roomValue" :mask="false" :focused="showKeyboard" length="6"
        @focus="showKeyboard = true"
      />
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="roomValue" :show="showKeyboard" @blur="showKeyboard = false" />
  </div>
</template>

<script lang="ts" setup>
import { showNotify } from 'vant'
// import { mainStore } from '~/store'
const router = useRouter()
// const indexStore = mainStore()
// const { userInfo } = storeToRefs(indexStore)
let roomValue = $ref('10000')
const showKeyboard = $ref(true)
// let tempRoomID = $ref('')

const joinRoom = async () => {
  console.log('roomValue', roomValue)
  const res = await useQueryRoomsByRoomNum(roomValue)
  if (res.length !== 0) {
    console.log('useInitRoomInfoByRoomNum', res[0].id)
    console.log('11111', 11111)
    useUpdatePlayerGameID(useGetUserID(), res[0].id)
    const flag = await usePushPlayerByRoomID(useGetUserID(), res[0].id, 'join')
    console.log('flag=============', flag)
    if (!flag)
      roomValue = ''
    else
    // 加入房间 将player id 添加到数据库中
      router.push('/play')
  }
  else {
    roomValue = ''
    showNotify({ type: 'danger', message: '请输入正确的房间号' })
  }
}

watch(
  () => roomValue,
  (newValue, oldValue) => {
    if (newValue.length === 6)
      joinRoom()
  },
)
</script>

<style lang="scss" scoped>

</style>
