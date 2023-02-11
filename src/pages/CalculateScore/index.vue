<template>
  <div overflow-y-auto h-screen>
    <div p-t-5 p-l-5 text-main text=" gray-700 dark:gray-200">
      {{ roomInfo.roomNum }} 房间
    </div>
    <div mt-8 flex justify-between>
      <div style="width: 33.33%">
        玩家
      </div>
      <div style="width: 33.33%">
        胜/负
      </div>
      <div style="width: 33.33%">
        得分
      </div>
    </div>
    <div v-for="(v, index) in roomInfo.gameList" :key="v.name">
      <div flex justify-between items-center mt-4>
        <div style="width: 33.33%" flex justify-center>
          <van-badge v-if="v.bookmaker" content="庄">
            <SvgIcon name="莫高窟第3窟·白衣观音" w-50px h-50px />
          </van-badge>
          <SvgIcon v-else name="莫高窟第3窟·白衣观音" w-50px h-50px />
          <div ml-2 style="line-height: 50px">
            {{ v.name }}
          </div>
        </div>
        <div style="width: 33.33%">
          <span v-if="v.isWin">胜</span>
          <span v-else>负</span>
        </div>
        <div style="width: 33.33%">
          {{ v.score }}
        </div>
      </div>
      <div>
        <div v-if="index === indexWin">
          <Tags :is-win="index === indexWin" :player-index="index" />
        </div>
        <div v-else>
          <Tags :is-win="index === indexWin" :player-index="index" />
        </div>
      </div>
    </div>
    <div mt-8>
      <button btn-main @click="onSave()">
        保存对局
      </button>
    </div>
    <Footer m-auto />
  </div>
</template>

<script lang="ts" setup>
// import AV from 'leancloud-storage/live-query'
import { mainStore } from '~/store'
import { saveGameInformation, useInitRoomInfo } from '~/hooks'
const indexStore = mainStore()
const { roomInfo } = storeToRefs(indexStore)
const route = useRoute()
const router = useRouter()

let indexWin: number = $ref(0)
// let counter: number = $ref(0)
const setBookmaker = () => {
  // indexWin = Number(route.query.index)
  // console.log('indexWin', indexWin)
  indexStore.$patch((state) => {
    for (let i = 0; i < state.roomInfo.gameList.length; i++)
      state.roomInfo.gameList[i].bookmaker = false
    state.roomInfo.gameList[indexWin].bookmaker = true
    console.log('state.roomInfo.players[indexWin]', state.roomInfo.players[indexWin])
    state.roomInfo.players[indexWin].bookmaker = true
    console.log(
      'state.roomInfo.gameList[indexWin].bookmaker',
      state.roomInfo.gameList[indexWin].bookmaker,
    )
  })
}
onMounted(async () => {
  await useInitRoomInfo()
  indexWin = Number(route.query.index)
  indexStore.$patch((state) => {
    for (let i = 0; i < state.roomInfo.gameList.length; i++) {
      if (i === indexWin) {
        state.roomInfo.gameList[i].isWin = true
        state.roomInfo.gameList[i].win = state.roomInfo.gameList[i].win + 1
        // 如果不是庄家赢则计数器+1 能整除4时圈数+1
        if (!state.roomInfo.gameList[i].bookmaker) {
          roomInfo.value.counter++
          if (roomInfo.value.counter % 4 === 0)
            roomInfo.value.roundsNumber++
        }
      }
      else {
        state.roomInfo.gameList[i].isWin = false
        state.roomInfo.gameList[i].lose = state.roomInfo.gameList[i].lose + 1
      }
    }
  })
})

const mergePlayer: any = () => {
  const tempPlayers = JSON.parse(JSON.stringify(roomInfo.value.players))
  for (let i = 0; i < roomInfo.value.gameList.length; i++) {
    const el = roomInfo.value.gameList[i]
    for (const key in el) {
      if (Object.prototype.hasOwnProperty.call(el, key)) {
        const item = el[key]
        if (key === 'score' || key === 'lose' || key === 'win')
          tempPlayers[i][key] += item
        else if (key === 'types')
          tempPlayers[i][key] = tempPlayers[i][key].concat(item)
        else if (key !== 'isWin')
          tempPlayers[i][key] = item
      }
    }
  }
  return tempPlayers
}

// 保存对局
const onSave = async () => {
  // 输入 roomID? 分数、对局数、圈数、庄家、历史记录 更新roomInfo信息
  // let data = {
  //   players: mergePlayer(),
  //   roundsNumber: roomInfo.value.roundsNumber,
  //   counter: roomInfo.value.counter,
  //   gamesNumber: roomInfo.value.gamesNumber + 1,
  // }
  const gameHistoricalList = roomInfo.value.gameHistoricalList
  gameHistoricalList.push([...roomInfo.value.gameList])
  setBookmaker()
  await saveGameInformation({
    players: mergePlayer(),
    roundsNumber: roomInfo.value.roundsNumber,
    counter: roomInfo.value.counter,
    gamesNumber: roomInfo.value.gamesNumber + 1,
    gameHistoricalList,
  })
  await useInitRoomInfo()
  // 输出 成功 失败
  // const temp = JSON.parse(JSON.stringify(players.value))
  // const res = await useQueryRooms(roomInfo.value.roomID)

  // const gamesNumber = roomInfo.value.gamesNumber + 1
  // // gameHistoricalList = gameHistoricalList.push(roomInfo.value.gameList)
  // const rooms = AV.Object.createWithoutData('Rooms', roomID.value)
  // rooms.set('players', mergePlayer())
  // rooms.set('gamesNumber', gamesNumber)
  // // rooms.set('roundsNumber', 1)
  // rooms.set('gameHistoricalList', gameHistoricalList)
  // rooms.save().then(
  //   (room) => {
  //     // 成功保存之后，执行其他逻辑
  //     // console.log(`保存成功。objectId：${room}`)
  //     useInitRoomInfo()
  //   },
  //   (error) => {
  //     // 异常处理
  //     console.error(error)
  //   },
  // )
  // await useInitRoomInfo()
  router.replace('/playing')
  // router.go(-1)
}
</script>

<style lang="scss" scoped></style>
