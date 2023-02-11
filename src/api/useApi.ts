// import AV from 'leancloud-storage/live-query'
import { showNotify } from 'vant'
// import { mainStore } from '~/store'
// const indexStore = mainStore()

// 获取房间信息
// export const useGetRoomInfo = async (userID: string) => {
//   const query = new AV.Query('Player')
//   query.equalTo('objectId', userID)
//   const res: any = await query.find()

//   const gameID = res[0]._serverData.gameID
//   return gameID
// }

// todo 获取房间历史房间列表 - 首页

// todo 获取4个用户数据
export const useAllUserInfo = async (palyerIDs: Array<any>) => {
  return Promise.all(palyerIDs.map(async (el) => {
    const query = new AV.Query('Player')
    query.equalTo('objectId', el)
    const res: any = await query.find()
    console.log('useAllUserInfo', res)
    return {
      id: res[0].id,
      ...res[0]._serverData,
    }
  }))
}
// 获取房间ID
export const useGetRoomIDByPlayerID = async (userID: string) => {
  const query = new AV.Query('Player')
  query.equalTo('objectId', userID)
  const res: any = await query.find()
  const roomID = res[0]._serverData.gameID
  console.log('useGetRoomIDByPlayerID 通过playerid 获取 roomid', res)
  return roomID
}

// 获取用户信息
export const useGetUserInfoByPlayerID = async (userID: string) => {
  const query = new AV.Query('Player')
  query.equalTo('objectId', userID)
  const res: any = await query.find()
  console.log('useGetUserInfoByPlayerID 获取用户信息', res)
  return res[0]._serverData
}

// 通过房间id 获取 房间信息 keys 想获取的key
export const useGetRoomInfoByRoomID = async (roomID: string, keys = '') => {
  console.log('roomID', roomID)
  console.log('keys', keys)
  const query = new AV.Query('Rooms')
  query.equalTo('objectId', roomID)
  const res: any = await query.find()
  const data = res[0]._serverData
  if (keys.length === 0) {
    return data
  }
  else {
    const tempData = {}
    for (let i = 0; i < keys.length; i++) {
      const el = keys[i]
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const item = data[key]
          if (el === key)
            tempData[key] = item
        }
      }
    }
    console.log('tempData', tempData)
    return tempData
  }
}

// 判断是否存在房间号
export const useIsInGame = async (userID: string) => {
  const gameID = await useGetRoomIDByPlayerID(userID)
  let flag = false
  if (gameID !== '')
    flag = true
  return flag
}

// 更新用户
export const useUpdatePlayerGameID = (userID: string, roomID: string) => {
  console.log('useUpdatePlayerData=========')
  console.log('roomID', roomID)
  const Player = AV.Object.createWithoutData('Player', userID)
  Player.set('gameID', roomID)
  Player.save().then((res: any) => {
    console.log('res', res)
  })
}

// 获取房间信息
const useGetRoomInfo = async (roomID: string) => {
  const query = new AV.Query('Rooms')
  query.equalTo('objectId', roomID)
  return new Promise((resolve) => {
    query.find().then((res: any) => {
      console.log('res', res)
      resolve(res)
    })
      .catch((error: any) => {
        console.error(error)
      })
  })
}

// 向room表中 添加player 或 移除
export const usePushPlayerByRoomID = async (userID: string, roomID: string, type: string) => {
  // type join leave
  console.log('usepushPlayerByRoomID=========')
  console.log('type', type)
  console.log('roomID', roomID)
  const roomInfo: any = await useGetRoomInfo(roomID)
  const tempPlayers = roomInfo[0]._serverData.players
  if (tempPlayers.includes(userID)) {
    showNotify({ type: 'danger', message: '您已在该房间！' })
    return false
  }

  if (tempPlayers.length === 4) {
    showNotify({ type: 'danger', message: '房间人数已满！' })
    return false
  }

  if (type === 'join')
    tempPlayers.push(userID)
  else
    tempPlayers.splice(tempPlayers.indexOf(userID), 1)
  const Rooms = AV.Object.createWithoutData('Rooms', roomID)
  Rooms.set('players', tempPlayers)
  return new Promise((resolve) => {
    Rooms.save().then((res: any) => {
      console.log('res', res)
      resolve(true)
    })
      .catch((error: any) => {
        console.error(error)
      })
  })
}

// 更新房间信息 传需要更新的字段
export const useUpdateRoomTable = async (roomID: string, keys: string[], list: any[]) => {
  console.log('keys', keys)
  console.log('list', list)
  // const a = [
  //   {
  //     key: '',
  //     value: '',
  //   },
  // ]
  const room = AV.Object.createWithoutData('Rooms', roomID)
  for (let i = 0; i < keys.length; i++) {
    const el = keys[i]
    room.set(el, list[i])
  }
  return new Promise((resolve) => {
    room.save().then((res: any) => {
      console.log('useUpdateRoomTable', res)
      resolve(res)
    })
      .catch((error: any) => {
        console.error(error)
      })
  })
}
export const useUpdatePlayerTable = async (players: string[], key: string, value: string) => {
  console.log('players', players)
  console.log('key', key)
  console.log('value', value)

  players.forEach(async (el) => {
    const Player = AV.Object.createWithoutData('Player', el)
    Player.set(key, value)
    Player.save()
  })
}

// 获取玩家 gameid
export const getPlayerGameID = () => {
  const query = new AV.Query('Player')
  return new Promise((resolve) => {
    query
      .get(useGetUserID())
      .then((res: any) => {
        console.log('res', res)
        resolve(res._serverData.gameID)
      })
      .catch((error: any) => {
        console.error(error)
      })
  })
}

// 查询 ProgressGame 通过 roomID 获取对局数据 gameID整合为列表
export const getProgressGameList = async (roomID: string) => {
  const query = new AV.Query('ProgressGame')
  query.limit(1000)
  query.equalTo('roomID', roomID)
  // return new Promise((resolve) => {
  try {
    const res = await query.find()
    console.log('getProgressGameList===', res)
    return res
  }
  catch (error) {
    console.log('error', error)
    return error
  }
}

export const getMahjongRules = async (ruleID: string) => {
  console.log('ruleID', ruleID)
  let Scoring: Array<any> = []
  let Gang: Array<any> = []

  const query = new AV.Query('RuleList')
  const res = await query.find()
  res.forEach((el: any) => {
    if (el.id === ruleID) {
      Scoring = el._serverData.Scoring
      Gang = el._serverData.Gang
    }
  })
  console.log('Scoring', Scoring)
  return {
    Scoring,
    Gang,
  }
}

// showNotify({ type: 'success', message: '开发中...' })

// // 查询 userInfo
// export const useQueryUserInfo: any = async () => {
//   const indexStore = mainStore()
//   const { userInfo } = indexStore
//   const query = new AV.Query('Player')
//   query.equalTo('objectId', userInfo.userID)
//   // return new Promise((resolve) => {
//   query
//     .find()
//     .then((res) => {
//       // resolve(res)
//       console.log('res', res)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
//   // })
// }
// // 查询当前对局数据到vuex
// export const useInitRoomInfo = async () => {
//   const indexStore = mainStore()
//   const { roomInfo } = indexStore
//   const res = await useQueryRooms(roomInfo.roomID)
//   if (res.length !== 0) {
//     // console.log('res', res[0]._serverData)
//     console.log('useInitRoomInfo', res[0]._serverData)
//     indexStore.initGameInformation(res[0]._serverData)
//   }
//   else {
//     console.error('error', res)
//   }
// }

// export const useQueryRoomsByRoomNum: any = async (roomNum: string) => {
//   const query = new AV.Query('Rooms')
//   query.equalTo('roomNum', roomNum)
//   return new Promise((resolve) => {
//     query
//       .find()
//       .then((res) => {
//         resolve(res)
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   })
// }

// // 更新
// export const useUpdateRoomInfo = async (roomID: string) => {
//   console.log('roomID', roomID)
//   const res = await useQueryRooms(roomID)
//   console.log('res', res)
//   const indexStore = mainStore()
//   if (res.length !== 0) {
//     // console.log('res', res[0]._serverData)
//     indexStore.setRoomID(res.id)
//     console.log('useInitRoomInfo', res[0]._serverData)
//     indexStore.initGameInformation(res[0]._serverData)
//   }
//   else {
//     indexStore.$patch((state) => {
//       state.userInfo.gameID = ''
//       state.userInfo.isIng = false
//       state.roomInfo = {
//         players: [],
//         multiples: '',
//         roomNum: '',
//         roomID: '',
//         date: '',
//         gamesNumber: 0,
//         roundsNumber: 0,
//         counter: 0,
//         gameHistoricalList: [],
//         gameList: [],
//       }
//       state.roomID = ''
//       //   state.quantity++
//     })
//     console.error('error', res)
//   }
//   // const res = await useQueryRoomsByRoomNum(roomNum)
//   // if (res.length !== 0)
//   //   console.log('useInitRoomInfoByRoomNum', res[0]._serverData)
//   //   // console.log('useInitRoomInfo', res[0]._serverData)
//   // // indexStore.initGameInformation(res[0]._serverData)
// }
// // 更新 player 信息
// export const useUpdatePlayer = async (
//   tempRoomID: string,
//   roomID: string,
//   player: any,
//   callback: Function,
// ) => {
//   const indexStore = mainStore()
//   const { userInfo } = indexStore
//   const rooms = AV.Object.createWithoutData('Rooms', tempRoomID)
//   rooms.set('players', player)
//   try {
//     const room = await rooms.save()
//     console.log('保存成功', room.id)
//     await useUpdateRoomInfo(roomID)
//     const playerInfo = AV.Object.createWithoutData('Player', userInfo.userID)
//     // console.log('userInfo.value', userInfo.value)
//     playerInfo.set('isIng', true)
//     playerInfo.set('gameID', roomID)
//     const res: any = await playerInfo.save()
//     // console.log('res2222222222', res)
//     indexStore.updateInfo({
//       ...res._serverData,
//     })
//     callback()
//     // router.push('/play')
//   }
//   catch (error) {
//     showNotify({ type: 'danger', message: '服务器错误' })
//     // 异常处理
//     console.error(error)
//   }
// }

// // update 后台 player 排序后的数据
// export const updateRoomData = async (type: any, row: any) => {
//   const indexStore = mainStore()
//   const { roomInfo } = indexStore
//   const roomList = await useQueryRooms(roomInfo.roomID)
//   console.log('roomList', roomList[0].id)
//   const tempRoomId = roomList[0].id
//   const rooms = AV.Object.createWithoutData('Rooms', tempRoomId)
//   // console.log('rooms', rooms)
//   if (type === 'players')
//     rooms.set('players', row)
//   if (type === 'createGame') {
//     console.log('row', row)
//     rooms.set('players', row.players)
//     rooms.set('gameList', row.gameList)
//     rooms.set('multiples', row.multiples)
//     rooms.set('isIng', row.isIng)
//   }

//   try {
//     const room = await rooms.save()
//     console.log('room', room)
//     // console.log('保存成功', room.id)
//     // // console.log('res2222222222', res)
//     // indexStore.updateInfo({
//     //   ...res._serverData,
//     // })
//     // callback()
//     // router.push('/play')
//   }
//   catch (error) {
//     showNotify({ type: 'danger', message: '服务器错误' })
//     // 异常处理
//     console.error(error)
//   }
// }

// interface gameInfo {
//   players: Array<any>
//   roundsNumber: number
//   gamesNumber: number
//   counter: number
//   gameHistoricalList: Array<any>
//   // isIng: boolean
// }
// // 输入 roomID? 分数、对局数、圈数、庄家、历史记录 更新roomInfo信息
// export const saveGameInformation = async (row: gameInfo) => {
//   console.log('row', row)
//   return
//   const indexStore = mainStore()
//   const { roomInfo } = indexStore
//   const roomList = await useQueryRooms(roomInfo.roomID)
//   console.log('roomList', roomList[0].id)
//   const tempRoomId = roomList[0].id
//   const rooms = AV.Object.createWithoutData('Rooms', tempRoomId)
//   rooms.set('players', row.players)
//   rooms.set('roundsNumber', row.roundsNumber)
//   rooms.set('gamesNumber', row.gamesNumber)
//   rooms.set('counter', row.counter)
//   rooms.set('gameHistoricalList', row.gameHistoricalList)
//   // rooms.set('isIng', row.isIng)

//   try {
//     const room = await rooms.save()
//     console.log('room', room)
//     // console.log('保存成功', room.id)
//     // // console.log('res2222222222', res)
//     // indexStore.updateInfo({
//     //   ...res._serverData,
//     // })
//     // callback()
//     // router.push('/play')
//   }
//   catch (error) {
//     showNotify({ type: 'danger', message: '服务器错误' })
//     // 异常处理
//     console.error(error)
//   }
// }

// // 乘法精度问题
// export const multiply = (a: number, b: number) => {
//   console.log(a * b)
//   // 先转换为字符串
//   const s1 = a.toString()
//   const s2 = b.toString()
//   let m1 = 0
//   let m2 = 0
//   try {
//     // 字符串拆分，获取小数点右边的长度
//     m1 += s1.split('.')[1].length
//   }
//   catch (error) { }
//   try {
//     m2 += s2.split('.')[1].length
//   }
//   catch (error) { }
//   // 转为整数
//   const t1 = Number(s1) * 10 ** m1
//   const t2 = Number(s2) * 10 ** m2
//   // 再转为小数
//   const result = (t1 * t2) / 10 ** (m1 + m2)
//   return result
// }
