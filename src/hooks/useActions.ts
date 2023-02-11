// import AV from 'leancloud-storage/live-query'
import { showNotify } from 'vant'
import { mainStore } from '~/store'

// 获取store userID
export const useGetUserID = (): string => {
  const indexStore = mainStore()
  const { userInfo } = indexStore
  return userInfo.userID
}

export const useQueryRooms: any = async (roomID: string) => {
  const query = new AV.Query('Rooms')
  query.equalTo('roomID', roomID)
  return new Promise((resolve) => {
    query
      .find()
      .then((res: any) => {
        resolve(res)
      })
      .catch((error: any) => {
        console.error(error)
      })
  })
}
// 查询 userInfo
export const useQueryUserInfo: any = async () => {
  const indexStore = mainStore()
  const { userInfo } = indexStore
  const query = new AV.Query('Player')
  query.equalTo('objectId', userInfo.userID)
  // return new Promise((resolve) => {
  query
    .find()
    .then((res: any) => {
      // resolve(res)
      console.log('res', res)
    })
    .catch((error: any) => {
      console.error(error)
    })
  // })
}
// 查询当前对局数据到vuex
export const useInitRoomInfo = async () => {
  const indexStore = mainStore()
  const { roomInfo } = indexStore
  const res = await useQueryRooms(roomInfo.roomID)
  if (res.length !== 0) {
    // console.log('res', res[0]._serverData)
    console.log('useInitRoomInfo', res[0]._serverData)
    indexStore.initGameInformation(res[0]._serverData)
  }
  else {
    console.error('error', res)
  }
}

// 通过房间号获取房间信息
export const useQueryRoomsByRoomNum: any = async (roomNum: string) => {
  const query = new AV.Query('Rooms')
  query.equalTo('roomNum', roomNum)
  return new Promise((resolve) => {
    query
      .find()
      .then((res: any) => {
        resolve(res)
      })
      .catch((error: any) => {
        console.error(error)
      })
  })
}

// 更新
export const useUpdateRoomInfo = async (roomID: string) => {
  console.log('roomID', roomID)
  const res = await useQueryRooms(roomID)
  console.log('res', res)
  const indexStore = mainStore()
  if (res.length !== 0) {
    // console.log('res', res[0]._serverData)
    indexStore.setRoomID(res.id)
    console.log('useInitRoomInfo', res[0]._serverData)
    indexStore.initGameInformation(res[0]._serverData)
  }
  else {
    indexStore.$patch((state) => {
      state.userInfo.gameID = ''
      state.userInfo.isIng = false
      state.roomInfo = {
        players: [],
        multiples: '',
        roomNum: '',
        roomID: '',
        date: '',
        gamesNumber: 0,
        roundsNumber: 0,
        counter: 0,
        gameHistoricalList: [],
        gameList: [],
      }
      state.roomID = ''
      //   state.quantity++
    })
    console.error('error', res)
  }
  // const res = await useQueryRoomsByRoomNum(roomNum)
  // if (res.length !== 0)
  //   console.log('useInitRoomInfoByRoomNum', res[0]._serverData)
  //   // console.log('useInitRoomInfo', res[0]._serverData)
  // // indexStore.initGameInformation(res[0]._serverData)
}
// 更新 player 信息
export const useUpdatePlayer = async (
  tempRoomID: string,
  roomID: string,
  player: any,
  callback: Function,
) => {
  const indexStore = mainStore()
  const { userInfo } = indexStore
  const rooms = AV.Object.createWithoutData('Rooms', tempRoomID)
  rooms.set('players', player)
  try {
    const room = await rooms.save()
    console.log('保存成功', room.id)
    await useUpdateRoomInfo(roomID)
    const playerInfo = AV.Object.createWithoutData('Player', userInfo.userID)
    // console.log('userInfo.value', userInfo.value)
    playerInfo.set('isIng', true)
    playerInfo.set('gameID', roomID)
    const res: any = await playerInfo.save()
    // console.log('res2222222222', res)
    indexStore.updateInfo({
      ...res._serverData,
    })
    callback()
    // router.push('/play')
  }
  catch (error) {
    showNotify({ type: 'danger', message: '服务器错误' })
    // 异常处理
    console.error(error)
  }
}

// update 后台 player 排序后的数据
export const updateRoomData = async (type: any, row: any) => {
  const indexStore = mainStore()
  const { roomInfo } = indexStore
  const roomList = await useQueryRooms(roomInfo.roomID)
  console.log('roomList', roomList[0].id)
  const tempRoomId = roomList[0].id
  const rooms = AV.Object.createWithoutData('Rooms', tempRoomId)
  // console.log('rooms', rooms)
  if (type === 'players')
    rooms.set('players', row)
  if (type === 'createGame') {
    console.log('row', row)
    rooms.set('players', row.players)
    rooms.set('gameList', row.gameList)
    rooms.set('multiples', row.multiples)
    rooms.set('isIng', row.isIng)
  }

  try {
    const room = await rooms.save()
    console.log('room', room)
    // console.log('保存成功', room.id)
    // // console.log('res2222222222', res)
    // indexStore.updateInfo({
    //   ...res._serverData,
    // })
    // callback()
    // router.push('/play')
  }
  catch (error) {
    showNotify({ type: 'danger', message: '服务器错误' })
    // 异常处理
    console.error(error)
  }
}

interface gameInfo {
  players: Array<any>
  roundsNumber: number
  gamesNumber: number
  counter: number
  gameHistoricalList: Array<any>
  // isIng: boolean
}
// 输入 roomID? 分数、对局数、圈数、庄家、历史记录 更新roomInfo信息
export const saveGameInformation = async (row: gameInfo) => {
  console.log('row', row)
  return
  const indexStore = mainStore()
  const { roomInfo } = indexStore
  const roomList = await useQueryRooms(roomInfo.roomID)
  console.log('roomList', roomList[0].id)
  const tempRoomId = roomList[0].id
  const rooms = AV.Object.createWithoutData('Rooms', tempRoomId)
  rooms.set('players', row.players)
  rooms.set('roundsNumber', row.roundsNumber)
  rooms.set('gamesNumber', row.gamesNumber)
  rooms.set('counter', row.counter)
  rooms.set('gameHistoricalList', row.gameHistoricalList)
  // rooms.set('isIng', row.isIng)

  try {
    const room = await rooms.save()
    console.log('room', room)
    // console.log('保存成功', room.id)
    // // console.log('res2222222222', res)
    // indexStore.updateInfo({
    //   ...res._serverData,
    // })
    // callback()
    // router.push('/play')
  }
  catch (error) {
    showNotify({ type: 'danger', message: '服务器错误' })
    // 异常处理
    console.error(error)
  }
}

// 乘法精度问题
export const multiply = (a: number, b: number) => {
  console.log(a * b)
  // 先转换为字符串
  const s1 = a.toString()
  const s2 = b.toString()
  let m1 = 0
  let m2 = 0
  try {
    // 字符串拆分，获取小数点右边的长度
    m1 += s1.split('.')[1].length
  }
  catch (error) { }
  try {
    m2 += s2.split('.')[1].length
  }
  catch (error) { }
  // 转为整数
  const t1 = Number(s1) * 10 ** m1
  const t2 = Number(s2) * 10 ** m2
  // 再转为小数
  const result = (t1 * t2) / 10 ** (m1 + m2)
  return result
}
