<template>
  <div overflow-y-auto h-screen>
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

    <div v-if="!loading" pb-10px style="margin-top: -10px">
      {{ roomText }}
    </div>
    <div flex justify-between mb-2>
      <div style="width: 40%">
        玩家
      </div>
      <div v-if="isHomeowner" style="width: 30%">
        总得分 / 胜/负
      </div>
      <div v-else>
        胜/负
      </div>
      <div v-if="isHomeowner" style="width: 30%">
        计分操作
      </div>
      <div v-else style="width: 30%">
        总得分
      </div>
    </div>
    <div v-for="v in dataState.playerData" :key="v.id" flex justify-between items-center mt-4>
      <div style="width: 40%" flex justify-center>
        <AvatarComponent :data-state="dataState" :item="v" />
      </div>
      <div v-if="isHomeowner" id="van-popover" style="width: 30%" text-score>
        {{ v.score ? v.score : 0 }} - {{ v.win ? v.win : 0 }}/{{ v.fail ? v.fail : 0 }}
      </div>
      <!-- 胜/负 -->
      <div v-else style="width: 30%" text-score>
        {{ v.win ? v.win : 0 }}/{{ v.fail ? v.fail : 0 }}
      </div>
      <div v-if="isHomeowner" style="width: 30%" flex justify-center>
        <button btn-main @click="onOperate(v.id)">
          操作
        </button>
      </div>
      <!-- 总得分 -->
      <div v-else style="width: 30%" text-score>
        {{ v.score ? v.score : 0 }}
      </div>
    </div>

    <!-- 历史记录 -->
    <div flex m-t-5>
      <div w-90vw py-4 px-4 mx-auto bg-white dark:bg-gray-400 dark:bg-opacity-10 rounded-xl shadow-md space-y-2>
        <div text-center space-y-2>
          <div>
            <div flex justify-between>
              <div text-lg text-left text-black dark:text-white font-semibold mb-2>
                最近三局
              </div>
              <div>
                <SvgIcon name="alldata" w-20px h-20px @click="allGameData()" />
              </div>
            </div>
            <p text-left text-gray-500 dark:text-gray-300 font-medium pb-1>
              Last Three Games
            </p>
          </div>
          <div v-if="dataState.gameList.length !== 0" text-gray-500 dark:text-gray-300 text-center text-4 m-b-2>
            <div v-for="v in dataState.gameList" :key="v.gamesNumber" mb-2>
              <van-row align="center">
                <van-col span="4">
                  <div text-score mt-6px>
                    第{{ v.gamesNumber }}局
                  </div>
                </van-col>
                <van-col span="7">
                  <div flex items-center justify-center>
                    <van-badge mt-6px :content="v.bookmaker === v.playerID ? '庄' : ''">
                      <SvgIcon :name="v.avatarName" w-40px h-40px />
                    </van-badge>
                    <div text-score mt-6px ml-5px>
                      {{ v.nickName }}
                    </div>
                  </div>
                </van-col>
                <van-col span="9">
                  <div>
                    <van-badge :content="v.wins.Gang.join('-')">
                      <div text-score mt-6px>
                        {{ v.wins.Scoring.join('-') }}
                      </div>
                    </van-badge>
                  </div>
                </van-col>
                <van-col span="4">
                  <div text-score mt-6px>
                    {{ v.score }}
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
          <div>
            <button mt-10px btn-main mr-4px @click="onEndGame()">
              结束对局
            </button>

            <button mt-10px btn bg-white ml-4px @click="refreshData()">
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
import { closeToast, showLoadingToast, showNotify } from 'vant'
import currency from 'currency.js'
import { isDark } from '~/composables'
import { mainStore } from '~/store'

const router = useRouter()
const route = useRoute()

const indexStore = mainStore()
const { roomID } = storeToRefs(indexStore)

const loading = $ref(false)

const dataState = reactive({
  roomData: {},
  playerData: [],
  gameList: [],
})

const isHomeowner = computed(() => {
  return dataState.roomData.homeownerID === useGetUserID()
})

const roomText = computed(() => {
  // console.log('dataState', dataState.roomData)
  return `第 ${dataState?.roomData?.roundsNumber} 圈 第 ${dataState?.roomData?.gamesNumber + 1} 局 倍率
    ${dataState?.roomData?.multiples}`
})

// 获取room信息
const getRoomInfo = async () => {
  // 加载开始
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
  const query = new AV.Query('Rooms')
  query.equalTo('objectId', roomID.value)
  const temp = await query.find()
  const res = temp[0]._serverData
  dataState.roomData = res
  const tempPlayerData = await useAllUserInfo(dataState.roomData.players)
  tempPlayerData.forEach((el) => {
    el.fail = 0
    el.win = 0
    el.score = 0
  })
  dataState.playerData = tempPlayerData
  CombinedData()
  // console.log('dataState', dataState)
}

const getGameList = async () => {
  const gameList = await getProgressGameList(roomID.value)
  dataState.playerData.forEach((el) => {
    gameList.forEach((item) => {
      const { playerID, fail, win, score } = item._serverData
      if (el.id === playerID) {
        el.fail = currency(el.fail).add(fail).dollars()
        el.win = currency(el.win).add(win).dollars()
        el.score = currency(el.score).add(score).dollars()
      }
    })
  })
  const tempGameList = gameList.map(el => el._serverData)
  const newList = []
  tempGameList.forEach((item) => {
    const newItem = newList.find(i => i.gamesNumber === item.gamesNumber)
    if (!newItem)
      newList.push({ gamesNumber: item.gamesNumber, children: [item] })
    else newItem.children.push(item)
  })
  return newList
}

// 计算胜负
async function CombinedData() {
  const tempList = await getGameList()
  dataState.gameList = []
  for (let i = tempList.length - 1; i >= tempList.length - 3; i--) {
    const el = tempList[i]
    dataState.gameList.push(el.children.filter(el => el.isWin)[0])
  }
  closeToast()
}

// 监听这条room数据变化
const liveQuery = () => {
  const query = new AV.Query('Rooms')
  query
    .equalTo('objectId', roomID.value)
    .subscribe()
    .then((liveQuery) => {
      console.log('liveQuery订阅成功', liveQuery)
      liveQuery.on('update', async (res, key) => {
        console.log('liveQuery 数据发生变化', res)
        // console.log('res._serverData', res?._serverData.players)
        // console.log('key', key)
        // if (key.includes('players') && res?._serverData.players.length > dataState.len)
        //   showNotify({ type: 'success', message: '玩家进入房间' })
        // if (key.includes('multiples'))
        //   router.push('/playing')
        getRoomInfo()
      })
    })
}

// 刷新数据
const refreshData = async () => {
  getRoomInfo()
}

// 操作
const onOperate = (id) => {
  router.push(`/SettleAccounts?winner=${id}`)
}

const allGameData = async () => {
  showNotify({ type: 'success', message: '全部对局数据 开发中...' })
}
const onEndGame = async () => {
  const tempList = await getGameList()
  console.log('tempList', tempList)
}
onMounted(async () => {
  getRoomInfo()
  liveQuery()
})
</script>

<style lang="scss" scoped>
.a {
  display: flex;
  flex-wrap: wrap;
}
</style>
