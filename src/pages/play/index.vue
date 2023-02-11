<template>
  <div class="play">
    <div p-t-5 p-l-5 text-main text=" gray-700 dark:gray-200">
      {{ dataState.roomData.roomNum }} 房间
    </div>
    <van-divider
      :style="{
        color: isDark ? '#E5E7EB' : '#394150',
        borderColor: isDark ? '#E5E7EB' : '#394150',
        padding: '0 16px',
      }"
    >
      {{ dataState.roomData.startData }} 开局
    </van-divider>
    <div flex justify-between>
      <div style="width: 50%">
        玩家
      </div>
      <div style="width: 20%">
        东南西北
      </div>
      <div v-if="dataState.roomData.homeownerID === useGetUserID()" style="width: 30%">
        操作
      </div>
      <div v-else style="width: 5%" />
    </div>
    <!-- 列表 -->
    <VueDraggableNext
      v-if="dataState.roomData.homeownerID === useGetUserID()"
      :list="dataState.playerData"
      class="list-group"
      ghost-class="ghost"
      @change="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div v-for="(v, index) in dataState.playerData" :key="v.id" flex justify-between items-center mt-4>
        <div style="width: 50%" flex justify-center>
          <van-badge
            v-if="dataState.roomData.homeownerID === v.id"
            :content="
              dataState.roomData.homeownerID === v.id && v.id === useGetUserID() && v.id === dataState.roomData.bookmaker
                ? '房主 庄 我'
                : dataState.roomData.homeownerID === v.id && v.id === dataState.roomData.bookmaker
                  ? '房主 庄'
                  : dataState.roomData.homeownerID === v.id && v.id === useGetUserID()
                    ? '房主 我'
                    : '房主'
            "
          >
            <SvgIcon
              v-if="dataState.roomData.homeownerID === v.id && v.id === useGetUserID() && v.id === dataState.roomData.bookmaker"
              :name="v.avatarName"
              w-70px
              h-50px
            />
            <SvgIcon v-else :name="v.avatarName" w-70px h-50px />
          </van-badge>
          <van-badge
            v-else
            :content="
              v.id === useGetUserID() && v.id === dataState.roomData.bookmaker
                ? '庄 我'
                : v.id === useGetUserID()
                  ? '我'
                  : v.id === dataState.roomData.bookmaker
                    ? '庄'
                    : ''
            "
          >
            <SvgIcon :name="v.avatarName" w-70px h-50px />
          </van-badge>
          <div flex flex-col justify-center m-l-2 min-w-80px max-w-80px>
            <div class="van-ellipsis">
              {{ v.nickName }}
            </div>
          </div>
        </div>
        <div id="van-popover" style="width: 20%">
          {{ index === 0 ? '东' : index === 1 ? '南' : index === 2 ? '西' : '北' }}
        </div>

        <div v-if="dataState.roomData.homeownerID === useGetUserID()" style="width: 30%" flex justify-center>
          <SvgIcon name="drag-drop" w-30px h-30px />
        </div>
        <div v-else style="width: 5%" />
      </div>
    </VueDraggableNext>
    <template v-else>
      <div v-for="(v, index) in dataState.playerData" :key="v.id" flex justify-between items-center mt-4>
        <div style="width: 50%" flex justify-center>
          <van-badge
            v-if="dataState.roomData.homeownerID === v.id"
            :content="
              dataState.roomData.homeownerID === v.id && v.id === useGetUserID() && v.id === dataState.roomData.bookmaker
                ? '房主 庄 我'
                : dataState.roomData.homeownerID === v.id && v.id === dataState.roomData.bookmaker
                  ? '房主 庄'
                  : dataState.roomData.homeownerID === v.id && v.id === useGetUserID()
                    ? '房主 我'
                    : '房主'
            "
          >
            <SvgIcon
              v-if="dataState.roomData.homeownerID === v.id && v.id === useGetUserID() && v.id === dataState.roomData.bookmaker"
              :name="v.avatarName"
              w-70px
              h-50px
            />
            <SvgIcon v-else :name="v.avatarName" w-70px h-50px />
          </van-badge>
          <van-badge
            v-else
            :content="
              v.id === useGetUserID() && v.id === dataState.roomData.bookmaker
                ? '庄 我'
                : v.id === useGetUserID()
                  ? '我'
                  : v.id === dataState.roomData.bookmaker
                    ? '庄'
                    : ''
            "
          >
            <SvgIcon :name="v.avatarName" w-70px h-50px />
          </van-badge>
          <div flex flex-col justify-center m-l-2 min-w-80px max-w-80px>
            <div class="van-ellipsis">
              {{ v.nickName }}
            </div>
          </div>
        </div>
        <div id="van-popover" style="width: 20%">
          {{ index === 0 ? '东' : index === 1 ? '南' : index === 2 ? '西' : '北' }}
        </div>

        <div v-if="dataState.roomData.homeownerID === useGetUserID()" style="width: 30%" flex justify-center>
          <SvgIcon name="drag-drop" w-30px h-30px />
        </div>
        <div v-else style="width: 5%" />
      </div>
    </template>
    <div m-t-50px w-100vw>
      <div w-90vw py-4 px-4 mx-auto bg-white dark:bg-gray-400 dark:bg-opacity-10 rounded-xl shadow-md space-y-2>
        <div text-center space-y-2>
          <div>
            <p text-lg text-left text-black dark:text-white font-semibold mb-2>
              对局设置
            </p>
            <van-field
              v-if="isBtnShow"
              v-model="ruleText"
              is-link
              readonly
              name="picker"
              label="游戏规则"
              placeholder="点击选择规则"
              @click="showPicker = true"
            />
            <van-field v-else v-model="ruleText" label="游戏规则" readonly />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
            </van-popup>
            <van-field v-if="isBtnShow" v-model="contentBookmaker" readonly label="庄家" />
            <van-field v-else v-model="contentBookmaker" label="庄家" readonly />
            <van-field v-if="isBtnShow" label="倍数">
              <template #input>
                <van-stepper v-model="multiples" />
              </template>
            </van-field>
            <van-field v-else v-model="multiples" label="倍数" readonly />
            <button v-if="isBtnShow" mt-30px btn-main mr-4 @click="goPlaying()">
              开始计分
            </button>
            <button mt-30px btn @click="refreshData()">
              刷新数据
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer m-auto />
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { VueDraggableNext } from 'vue-draggable-next'
import { v4 as uuidv4 } from 'uuid'
import { closeToast, showLoadingToast, showNotify } from 'vant'
import { getRandomSixDigit } from '~/utils'
import { mainStore } from '~/store'
const indexStore = mainStore()
const { roomID, userInfo } = storeToRefs(indexStore)
const router = useRouter()
const roomNum = $ref()
let ruleText = $ref('')
let ruleID = $ref('')
const columns = $ref([])
let showPicker = $ref(false)
const dataState = reactive({
  roomData: {},
  playerData: [],
})

// 倍数
const multiples = $ref(2)

let unbind = null

const isBtnShow = computed(() => {
  // console.log('dataState=======', dataState)
  // console.log('dataState=======', dataState.roomData.homeownerID === useGetUserID())
  return dataState.roomData.homeownerID === useGetUserID()
})

const contentBookmaker = computed(() => {
  const str = dataState.playerData.filter(el => el.id === dataState.roomData.bookmaker)[0]?.nickName
  return str
})

const onConfirm = ({ selectedOptions }) => {
  console.log('selectedOptions', selectedOptions)
  ruleText = selectedOptions[0]?.text
  ruleID = selectedOptions[0]?.value
  showPicker = false
}

// 拖拽变化
const checkMove = async () => {
  const res = await useUpdateRoomTable(roomID.value, ['players', 'bookmaker'], [dataState.playerData.map(el => el.id), dataState.playerData[0].id])
}

// 开始计分
const goPlaying = async () => {
  if (dataState.roomData.players.length < 4) {
    showNotify({ type: 'danger', message: '玩家数量不足4人！' })
    return
  }

  await useUpdatePlayerTable(dataState.roomData.players, 'isIng', true)
  await useUpdateRoomTable(roomID.value, ['multiples', 'ruleID'], [Number(multiples), ruleID])

  router.replace('/playing')
  unbind()
}

// 获取room信息
const getRoomInfo = async () => {
  // console.log('roomID.value', roomID.value)
  const query = new AV.Query('Rooms')
  query.equalTo('objectId', roomID.value)
  const temp = await query.find()
  const res = temp[0]._serverData
  // console.log('getRoomInfo', res)
  dataState.roomData = res
  // console.log('dataState.roomData', dataState.roomData)
  // console.log('dataState.roomData.homeownerID', dataState.roomData.homeownerID)
  dataState.playerData = await useAllUserInfo(dataState.roomData.players)
  dataState.len = dataState.roomData.players.length
  // console.log('dataState.playerData', dataState.playerData)
  // console.log('dataState.roomData', dataState.roomData)
}

// 监听这条room数据变化
const liveQuery = () => {
  console.log('roomID.value', roomID.value)
  const query = new AV.Query('Rooms')
  query
    .equalTo('objectId', roomID.value)
    .subscribe()
    .then((liveQuery) => {
      console.log('liveQuery订阅成功', liveQuery)
      const upsert = async (res, key) => {
        console.log('liveQuery 数据发生变化', res)
        // console.log('res._serverData', res?._serverData.players)
        // console.log('key', key)
        if (key.includes('players') && res?._serverData.players.length > dataState.len)
          showNotify({ type: 'success', message: '玩家进入房间' })
        if (key.includes('multiples')) {
          router.replace('/playing')
          unbind()
        }
        getRoomInfo()
      }
      liveQuery.on('update', upsert)
      unbind = () => {
        // 取消订阅
        liveQuery.off('update', upsert)
        liveQuery.unsubscribe()
      }
    })
}

// 创建房间
const createRoom = () => {
  dataState.roomData.roomNum = getRandomSixDigit()
  //  初始化房间 需要 房间号、房间ID 开始时间 总局数 圈数 房主id 玩家[0]
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '加载中...',
  })
  const rooms = new AV.Object('Rooms')
  // 为属性赋值
  rooms.set('startData', dayjs().format('YYYY-MM-DD HH:mm:ss'))
  rooms.set('roomNum', dataState.roomData.roomNum)
  rooms.set('players', [userInfo.value.userID])
  rooms.set('roomID', uuidv4())
  rooms.set('gamesNumber', 1)
  rooms.set('roundsNumber', 1)
  rooms.set('isIng', false)
  rooms.set('homeownerID', userInfo.value.userID)
  rooms.set('bookmaker', userInfo.value.userID)
  rooms.set('ruleID', ruleID)
  rooms.save().then(
    (room) => {
      console.log('room', room)
      setTimeout(() => {
        toast.message = '创建成功！'
        closeToast()
        // 存储 roomID
        indexStore.setRoomID(room.id)
        // 更新用户表 正在进行的对局id
        useUpdatePlayerGameID(useGetUserID(), room.id)
        getRoomInfo()
        liveQuery()
      }, 500)
    },
    (error) => {
      // 异常处理
      console.error('error', error)
    },
  )
}

// 刷新数据
const refreshData = async () => {
  const { isIng } = await useGetUserInfoByPlayerID(useGetUserID())
  // 如果在进行中 则跳转到 playing
  if (isIng) {
    router.replace('/playing')
    unbind()
  }
  else {
    getRoomInfo()
    liveQuery()
  }
}

onMounted(async () => {
  const { isIng } = await useGetUserInfoByPlayerID(useGetUserID())
  // 如果在进行中 则跳转到 playing
  if (isIng) {
    router.replace('/playing')
    unbind()
  }

  const playerGameID = await getPlayerGameID()
  console.log('playerGameID', playerGameID)
  if (playerGameID !== '') {
    indexStore.setRoomID(playerGameID)
    // 1. 存在gameID 加载房间信息
    console.log('存在房间')
    getRoomInfo()
    liveQuery()
  }
  else {
    // 2. 创建新房间
    console.log('创建新房间')
    createRoom()
  }

  // 获取规则
  const query = new AV.Query('RuleList')
  query.find().then((res) => {
    console.log('res====', res)
    res.forEach((el) => {
      columns.push({
        value: el.id,
        text: el._serverData.RuleName,
      })
    })

    ruleText = res[0]?._serverData.RuleName
    ruleID = res[0]?.id
    // students 是包含满足条件的 Student 对象的数组
  })
})
</script>

<style lang="scss" scoped>
.play {
  .ghost {
    opacity: 0.3;
    background: #bfd8f4;
  }

  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='checkbox'],
    input[type='radio'] {
      --active: #3662e3;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, 0.3);
      --border: #bbc1e1;
      --border-hover: #3662e3;
      --background: #fff;
      --disabled: #f6f8ff;
      --disabled-inner: #e1e6f9;
      appearance: none;
      // -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;

      &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      }

      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }

      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;

        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }

        & + label {
          cursor: not-allowed;
        }
      }

      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }

      &:focus {
        box-shadow: 0 0 0 var(--focus);
      }

      &:not(.switch) {
        width: 21px;

        &:after {
          opacity: var(--o, 0);
        }

        &:checked {
          --o: 1;
        }
      }

      & + label {
        font-size: 14px;
        line-height: 21px;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        margin-left: 4px;
      }
    }

    input[type='checkbox'] {
      &:not(.switch) {
        border-radius: 7px;

        &:after {
          width: 5px;
          height: 9px;
          border: 2px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          left: 7px;
          top: 4px;
          transform: rotate(var(--r, 20deg));
        }

        &:checked {
          --r: 43deg;
        }
      }

      &.switch {
        width: 38px;
        border-radius: 11px;

        &:after {
          left: 2px;
          top: 2px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: var(--ab, var(--border));
          transform: translateX(var(--x, 0));
        }

        &:checked {
          --ab: var(--active-inner);
          --x: 17px;
        }

        &:disabled {
          &:not(:checked) {
            &:after {
              opacity: 0.6;
            }
          }
        }
      }
    }

    input[type='radio'] {
      border-radius: 50%;

      &:after {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: var(--active-inner);
        opacity: 0;
        transform: scale(var(--s, 0.7));
      }

      &:checked {
        --s: 0.5;
      }
    }
  }
}
</style>
