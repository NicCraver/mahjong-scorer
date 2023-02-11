import { defineStore } from 'pinia'
interface UserInfo {
  userID: string
  gameID: string
  isIng: boolean
  avatarName: string
  nickName: string
  passWord: string
  userName: string
}
interface RoomInfo {
  players: Array<any>
  multiples: string
  roomNum: string
  roomID: string
  date: string
  gamesNumber: number
  counter: number
  roundsNumber: number
  gameHistoricalList: Array<any>
  gameList: Array<any>
}
export const mainStore = defineStore('main', {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    return {
      userInfo: {
        // userID:'',
        // avatarName: '莫高窟第3窟·白衣观音',
        // nickName: '老李',
        // passWord: '1111',
        // userName: 'root',
        // gameID: 'root',
      } as UserInfo,
      avatarList: [
        {
          name: '莫高窟第3窟·白衣观音',
        },
        {
          name: '榆林窟第3窟·普贤菩萨',
        },
        {
          name: '榆林窟第10窟·伎乐飞天',
        },
        {
          name: '莫高窟第112窟·听法菩萨',
        },
        {
          name: '莫高窟第71窟·思维菩萨2',
        },
        {
          name: '莫高窟第112窟·菩萨',
        },
        {
          name: '莫高窟第71窟·思维菩萨1',
        },
        {
          name: '莫高窟第112窟·无量寿佛',
        },
        {
          name: '莫高窟第57窟-佛',
        },
        {
          name: '莫高窟第57窟-菩萨',
        },
        {
          name: '榆林窟第25窟·弥勒佛',
        },
        {
          name: '榆林窟第25窟·听法菩萨',
        },
      ],
      roomID: '',
      players: [
        //   {
        //   name: '老李',
        //   avatarName: 'avatar01',
        //   score: 0,
        //   isWin: false,
        //   win: 0,
        //   lose: 0,
        //   types: [],
        //   bookmaker: true,
        // },
      ],
      roomInfo: {
        // multiples:1,
        // players: temp,
        // roomNum: getRandomSixDigit(),
        // roomID: uuidv4(),
        // date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        // gamesNumber: 1,
        // roundsNumber: 1,
        // gameHistoricalList: [],
        // gameList: temp,
        // 单局信息
        // {
        // name: '老魏',
        // score: 0,
        // isWin:false,
        // win: 0,
        // lose: 0,
        // types: [],
        // bookmaker: false,
        // }
      } as RoomInfo,
    }
  },
  getters: {
  },
  actions: {
    setRoomID(row: string) {
      this.roomID = row
    },
    initGameInformation(row: RoomInfo) {
      this.roomInfo = row
    },
    // 保存用户信息
    saveInfo(row: UserInfo) {
      this.userInfo = row
    },
    updateInfo(row: UserInfo) {
      this.userInfo.gameID = row.gameID
      this.userInfo.isIng = row.isIng
    },
  },
})
