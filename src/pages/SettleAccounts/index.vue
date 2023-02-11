<!--
 * @Author: Nic
 * @Date: 2023-02-04 16:10:57
 * @LastEditTime: 2023-02-08 09:28:31
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/src/pages/SettleAccounts/index.vue
-->
<template>
  <div overflow-y-auto h-screen>
    <div p-t-5 p-l-5 text-main text=" gray-700 dark:gray-200">
      {{ dataState.roomData.roomNum }} 房间
    </div>
    <div mt-2 mb-2 flex justify-between>
      <div style="width: 40%">
        玩家
      </div>
      <div style="width: 30%">
        胜/负
      </div>
      <div style="width: 30%">
        得分
      </div>
    </div>
    <van-radio-group v-model="dataState.checked" checked-color="#2463EB" @change="checkedChange">
      <div v-for="(v, index) in dataState.playerData" :key="v.id" mt-4>
        <div flex justify-between items-center>
          <div style="width: 40%" flex justify-center>
            <AvatarComponent :data-state="dataState" :item="v" />
          </div>

          <!-- 胜/负 -->
          <div style="width: 30%" flex justify-center>
            <van-radio :name="v.id">
              {{ dataState.checked === v.id ? '胜' : '负' }}
            </van-radio>
          </div>

          <!-- 总得分 -->
          <div style="width: 30%">
            {{ v.score }}
          </div>
        </div>
        <div>
          <div v-if="dataState.checked === v.id">
            <div pl-1 pr-1>
              <button
                v-for="(item, itemIndex) in v.Gang"
                :key="itemIndex"
                :class="item.flag ? 'tag-main' : 'tag'"
                mr-2
                mt-2
                @click="GangChange(item, index, itemIndex)"
              >
                {{ item.name }}
              </button>
            </div>
            <div pl-1 pr-1>
              <button
                v-for="(item, itemIndex) in v.Scoring"
                :key="itemIndex"
                :class="item.flag ? 'tag-main' : 'tag'"
                mr-2
                mt-2
                @click="ScoringChange(item, index, itemIndex)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
          <div v-else>
            <button
              v-for="(item, itemIndex) in v.Gang"
              :key="itemIndex"
              :class="item.flag ? 'tag-main' : 'tag'"
              mr-2
              mt-2
              @click="GangChange(item, index, itemIndex)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </van-radio-group>
    <div mt-8>
      <button btn-main @click="onSave()">
        保存对局
      </button>
      <button btn-main @click="onRes()">
        保存对局
      </button>
    </div>
    <Footer m-auto mb-20px />
  </div>
</template>

<script lang="ts" setup>
import { showNotify } from 'vant'
import currency from 'currency.js'
import { v4 as uuidv4 } from 'uuid'
import { mainStore } from '~/store'
const indexStore = mainStore()
const { roomID } = storeToRefs(indexStore)

const route = useRoute()
const router = useRouter()

const dataState: any = reactive({
  roomData: {},
  playerData: [],
  checked: '',
})

const checkedChange = () => {
  dataState.playerData.forEach((el: any) => {
    el.Scoring.forEach((item: any) => {
      item.flag = false
    })
    el.Gang.forEach((item: any) => {
      item.flag = false
    })
    el.score = 0
    if (el.id === dataState.checked)
      el.isWin = true
    else el.isWin = false
  })
  // console.log('dataState.playerData', dataState.playerData)
}

// 修改其他玩家分数
const changeOtherPlayerScore = (id: string, val: any, type: string) => {
  // console.log('val', val.value)
  // console.log('type', type)
  val = currency(val).divide(3).dollars()
  dataState.playerData.forEach((el: any) => {
    if (el.id !== id)
      el.score = currency(el.score)[type](val).dollars()
  })
}

const ScoringChange = (item: any, index: number, itemIndex: number) => {
  let val: any = 0
  // 进这个方法是必赢的
  // TODO 单选逻辑 点击相同逻辑同下 点击不同的按钮  增加分数  减之前按钮的分数
  // dataState.playerData[index].Scoring.forEach((el: any) => {
  //   el.flag = false
  // })

  // console.log('99900099900099', 99900099900099)
  // 选中后改变状态
  dataState.playerData[index].Scoring[itemIndex].flag
    = !dataState.playerData[index].Scoring[itemIndex].flag

  const id = dataState.playerData[index].id
  const isBookmaker = dataState.roomData.bookmaker === id
  // const isWin = dataState.checked === id

  val = 0
  // 赢了并且是庄 要翻倍
  if (isBookmaker) {
    val = currency(item.value).multiply(dataState.roomData.multiples).multiply(2).multiply(3)
    changeScore(val)
  }
  else {
    val = currency(item.value).multiply(dataState.roomData.multiples).multiply(3)
    changeScore(val)
  }

  function changeScore(val: any) {
    if (dataState.playerData[index].Scoring[itemIndex].flag) {
      changeOtherPlayerScore(dataState.playerData[index].id, val, 'subtract')
      calculateScore(val, 'add')
    }
    else {
      changeOtherPlayerScore(dataState.playerData[index].id, val, 'add')
      calculateScore(val, 'subtract')
    }
  }

  function calculateScore(val: any, type: string) {
    dataState.playerData[index].score = currency(dataState.playerData[index].score)
      // eslint-disable-next-line no-unexpected-multiline
      [type](val)
      .dollars()
  }
  console.log('dataState.playerData[index]', dataState.playerData[index])
}

const GangChange = (item: any, index: number, itemIndex: number) => {
  // 选中后改变状态
  dataState.playerData[index].Gang[itemIndex].flag
    = !dataState.playerData[index].Gang[itemIndex].flag

  const id = dataState.playerData[index].id
  // 判断玩家是否是庄
  const isBookmaker = dataState.roomData.bookmaker === id
  // 判断当前 玩家 是赢还是输
  const isWin = dataState.checked === id

  let val: any = 0
  if (isWin && isBookmaker) {
    val = currency(item.value).multiply(dataState.roomData.multiples).multiply(3)
    changeScore(val)
  }
  else if (isWin && !isBookmaker) {
    val = currency(item.value).multiply(dataState.roomData.multiples).multiply(3)
    changeScore(val)
  }
  else {
    val = currency(item.value).multiply(dataState.roomData.multiples).multiply(3)
    changeScore(val)
  }

  function changeScore(val: any) {
    if (dataState.playerData[index].Gang[itemIndex].flag) {
      changeOtherPlayerScore(dataState.playerData[index].id, val, 'subtract')
      calculateScore(val, 'add')
    }
    else {
      changeOtherPlayerScore(dataState.playerData[index].id, val, 'add')
      calculateScore(val, 'subtract')
    }
  }

  function calculateScore(val: any, type: string) {
    dataState.playerData[index].score = currency(dataState.playerData[index].score)
      // eslint-disable-next-line no-unexpected-multiline
      [type](val)
      .dollars()
  }
}

function isChoose() {
  let flag = false
  const temp: any = dataState.playerData.filter((el: any) => el.id === dataState.checked)
  const arr = [...temp[0].Scoring, ...temp[0].Gang]
  arr.forEach((el: any) => {
    if (el.flag)
      flag = true
  })
  return flag
}

// 获取room信息
const getRoomInfo = async () => {
  const query = new AV.Query('Rooms')
  query.equalTo('objectId', roomID.value)
  const temp = await query.find()
  const res = temp[0]._serverData
  console.log('res', res)
  dataState.roomData = res
  const tempPlayerData = await useAllUserInfo(dataState.roomData.players)
  const { Scoring, Gang } = await getMahjongRules(dataState.roomData.ruleID)
  const gameInfo = {
    roomID: roomID.value,
    roomNum: res.roomNum,
    gameID: uuidv4(),
    playerID: useGetUserID(),
    roundsNumber: res.gamesNumber,
    gamesNumber: res.gamesNumber + 1,
    isWin: false,
    score: 0,
    win: 0,
    fail: 0,
    wins: {
      Scoring: [],
      Gang: [],
    },
    fails: {
      Scoring: [],
      Gang: [],
    },
    palyers: tempPlayerData.map(el => el.id),
    bookmaker: res.bookmaker,
    homeownerID: res.homeownerID,
    winPhoto: '',
  }
  tempPlayerData.forEach((el) => {
    // 通过传参 确定赢家
    if (el.id === route.query.winner) {
      dataState.checked = route.query.winner
      el.isWin = true
    }
    el.Scoring = Scoring
    el.Gang = Gang
    for (const key in gameInfo) {
      if (Object.prototype.hasOwnProperty.call(gameInfo, key)) {
        const item = gameInfo[key]
        if (key === 'playerID')
          el.playerID = el.id
        else el[key] = item
      }
    }
  })
  console.log('tempPlayerData', tempPlayerData)
  dataState.playerData = JSON.parse(JSON.stringify(tempPlayerData))
  console.log('dataState', dataState)
}

const onRes = () => {
  useUpdateRoomTable(
    roomID.value,
    ['bookmaker', 'roundsNumber', 'gamesNumber'],
    ['631da5a81f226a25e263ce59', 1, 0],
  )
}
// 保存对局
const onSave = async () => {
  // 判断是否选择
  if (!isChoose()) {
    showNotify({ type: 'danger', message: '请选择后再保存！' })
    return
  }
  // 更新到 ProgressGame表的4条数据
  console.log('onSave===', dataState.playerData)

  const wins: any = {
    Scoring: [],
    Gang: [],
  }
  // 统计 赢什么 输什么
  dataState.playerData.forEach((el: any) => {
    // 判断谁是赢家
    if (dataState.checked === el.id) {
      el.win = el.win + 1
      el.Scoring.forEach((item: any) => {
        if (item.flag) {
          el.wins.Scoring.push(item.name)
          wins.Scoring.push(item.name)
        }
      })
      el.Gang.forEach((item: any) => {
        if (item.flag) {
          el.wins.Gang.push(item.name)
          wins.Gang.push(item.name)
        }
      })
    }
    else {
      el.fail = el.fail + 1
    }
  })
  dataState.playerData.forEach((el: any) => {
    if (dataState.checked !== el.id)
      el.fails = wins
  })
  // 结算后 更新 room表 数据（切换庄家、圈数、局数等信息）
  const tempRoomInfo = {
    bookmaker: dataState.roomData.bookmaker,
    roundsNumber: dataState.roomData.roundsNumber,
    gamesNumber: dataState.roomData.gamesNumber,
  }
  // 最后一个玩家
  const lastPlayer = dataState.playerData[dataState.playerData.length - 1]

  const index = dataState.playerData.findIndex(
    (item: any) => item.id === dataState.roomData.bookmaker,
  )
  // 如果庄家赢了 连庄 则庄家数据不变   如果庄家输了 切换庄家
  if (dataState.roomData.bookmaker !== dataState.checked) {
    // 如果lastPlayer id  === dataState.checked 圈数增加
    if (dataState.roomData.bookmaker === lastPlayer.id && lastPlayer.id !== dataState.checked) {
      // 圈数增加后  庄家切换为第一个人
      tempRoomInfo.bookmaker = dataState.playerData[0].id
      tempRoomInfo.roundsNumber = currency(tempRoomInfo.roundsNumber).add(1).dollars()
    }
    else {
      console.log('庄家输 切换庄家', index + 1)
      tempRoomInfo.bookmaker = dataState.playerData[index + 1].id
    }
  }
  tempRoomInfo.gamesNumber = currency(tempRoomInfo.gamesNumber).add(1).dollars()
  // 更新room表 的 数据 tempRoomInfo
  dataState.playerData.forEach(async (el: any) => {
    await createProgressGame(el)
  })
  console.log('tempRoomInfo', tempRoomInfo)

  await useUpdateRoomTable(
    roomID.value,
    ['bookmaker', 'roundsNumber', 'gamesNumber'],
    [tempRoomInfo.bookmaker, tempRoomInfo.roundsNumber, tempRoomInfo.gamesNumber],
  )
  router.go(-1)
}

async function createProgressGame(row: any) {
  // console.log('dataState.playerData', dataState.playerData)
  console.log('row', row)
  // return
  const ProgressGame = new AV.Object('ProgressGame')
  ProgressGame.set('nickName', row.nickName)
  ProgressGame.set('avatarName', row.avatarName)
  ProgressGame.set('gameID', row.gameID)
  ProgressGame.set('gamesNumber', row.gamesNumber)
  ProgressGame.set('homeownerID', row.homeownerID)
  ProgressGame.set('bookmaker', row.bookmaker)
  ProgressGame.set('fails', row.fails)
  ProgressGame.set('isWin', row.isWin)
  ProgressGame.set('palyers', row.palyers)
  ProgressGame.set('playerID', row.playerID)
  ProgressGame.set('roomID', row.roomID)
  ProgressGame.set('roomNum', row.roomNum)
  ProgressGame.set('roundsNumber', row.roundsNumber)
  ProgressGame.set('score', row.score)
  ProgressGame.set('win', row.win)
  ProgressGame.set('fail', row.fail)
  // ProgressGame.set('winPhoto', row.winPhoto)
  ProgressGame.set('wins', row.wins)
  const res = await ProgressGame.save()
  console.log(`保存成功。objectId：${res.id}`)
  showNotify({ type: 'success', message: '保存成功!' })
}

onMounted(async () => {
  console.log('onMounted')
  // showLoadingToast({
  //   message: '加载中...',
  //   forbidClick: true,
  // })
  getRoomInfo()
  //   console.log('getProgressGameList(roomID.value)', await getProgressGameList(roomID.value))
})
</script>

<style lang="scss" scoped></style>
