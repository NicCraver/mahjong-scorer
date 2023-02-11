<template>
  <div v-if="props.isWin" pl-1 pr-1>
    <button
      v-for="(v, index) in Scoring"
      :key="index"
      :class="v.flag ? 'tag-main' : 'tag'"
      mr-2
      mt-2
      @click="ScoringChange(index)"
    >
      {{ v.name }}
    </button>
  </div>
  <div v-else pl-1 pr-1>
    <button
      v-for="(v, index) in Gang"
      :key="index"
      :class="v.flag ? 'tag-main' : 'tag'"
      mr-2
      mt-2
      @click="GangChange(index)"
    >
      {{ v.name }}
    </button>
  </div>
</template>

<script setup>
import { mainStore } from '~/store'
const props = defineProps({
  isWin: {
    type: Boolean,
  },
  playerIndex: {
    type: Number,
  },
})
const route = useRoute()
const indexStore = mainStore()
const { roomInfo } = storeToRefs(indexStore)
// const { players } = storeToRefs(indexStore)
const Scoring = $ref([
  {
    name: '明杠',
    value: 1,
    flag: false,
  },
  {
    name: '暗杠',
    value: 2,
    flag: false,
  },
  {
    name: '提溜',
    value: 1,
    flag: false,
  },
  {
    name: '混吊',
    value: 2,
    flag: false,
  },
  {
    name: '捉伍儿',
    value: 3,
    flag: false,
  },
  {
    name: '龙',
    value: 4,
    flag: false,
  },
  {
    name: '素的',
    value: 2,
    flag: false,
  },
  {
    name: '本混龙',
    value: 8,
    flag: false,
  },
  {
    name: '双混儿伍儿',
    value: 6,
    flag: false,
  },
  {
    name: '没混儿伍儿',
    value: 6,
    flag: false,
  },
  {
    name: '捉伍儿龙',
    value: 7,
    flag: false,
  },
  {
    name: '混儿吊龙',
    value: 8,
    flag: false,
  },
  {
    name: '没混儿龙',
    value: 8,
    flag: false,
  },
  {
    name: '双混儿捉伍儿龙',
    value: 14,
    flag: false,
  },
  {
    name: '没混儿捉伍儿龙',
    value: 14,
    flag: false,
  },
  {
    name: '捉伍儿本混儿龙',
    value: 14,
    flag: false,
  },
  {
    name: '混儿吊本混儿龙',
    value: 16,
    flag: false,
  },
  {
    name: '双混儿捉伍儿本混儿龙',
    value: 28,
    flag: false,
  },
])

const Gang = $ref([
  {
    name: '明杠',
    value: 1,
    flag: false,
  },
  {
    name: '暗杠',
    value: 2,
    flag: false,
  },
])

const ScoringChange = (index) => {
  const indexWin = Number(route.query.index)
  if (Scoring[index].name === '明杠' || Scoring[index].name === '暗杠') {
    const temp = JSON.parse(JSON.stringify(Scoring[index]))
    Scoring[index].flag = !Scoring[index].flag
    if (Scoring[index].flag)
      Scoring.splice(index + 1, 0, temp)
    else Scoring.splice(index + 1, 1)
  }
  else {
    Scoring[index].flag = !Scoring[index].flag
  }
  indexStore.$patch((state) => {
    if (Scoring[index].flag) {
      state.roomInfo.gameList[props.playerIndex].types.push(Scoring[index].name)
    }
    else {
      for (let i = 0; i < state.roomInfo.gameList[props.playerIndex].types.length; i++) {
        const el = state.roomInfo.gameList[props.playerIndex].types[i]
        if (el === Scoring[index].name) {
          state.roomInfo.gameList[props.playerIndex].types.splice(i, 1)
          break
        }
      }
    }
    for (let i = 0; i < state.roomInfo.gameList.length; i++) {
      if (i === indexWin) {
        // 如果赢 分数相加
        if (Scoring[index].flag)
          state.roomInfo.gameList[i].score += Scoring[index].value * state.roomInfo.multiples
        else state.roomInfo.gameList[i].score -= Scoring[index].value * state.roomInfo.multiples
      }
      else {
        // 如果输
        if (Scoring[index].flag)
          state.roomInfo.gameList[i].score -= Scoring[index].value * state.roomInfo.multiples
        else state.roomInfo.gameList[i].score += Scoring[index].value * state.roomInfo.multiples
      }
    }
  })
}

const GangChange = (index) => {
  const indexWin = Number(route.query.index)
  const temp = JSON.parse(JSON.stringify(Gang[index]))
  Gang[index].flag = !Gang[index].flag
  if (Gang[index].flag)
    Gang.splice(index + 1, 0, temp)
  else Gang.splice(index + 1, 1)

  indexStore.$patch((state) => {
    if (Gang[index].flag) {
      state.roomInfo.gameList[props.playerIndex].types.push(Gang[index].name)
    }
    else {
      for (let i = 0; i < state.roomInfo.gameList[props.playerIndex].types.length; i++) {
        const el = state.roomInfo.gameList[props.playerIndex].types[i]
        if (el === Gang[index].name) {
          state.roomInfo.gameList[props.playerIndex].types.splice(i, 1)
          break
        }
      }
    }
    if (Gang[index].flag) {
      state.roomInfo.gameList[props.playerIndex].score
        += Gang[index].value * state.roomInfo.multiples
      for (let i = 0; i < state.roomInfo.gameList.length; i++) {
        if (i !== props.playerIndex)
          state.roomInfo.gameList[i].score -= Gang[index].value * state.roomInfo.multiples
      }
    }
    else {
      state.roomInfo.gameList[props.playerIndex].score
        = state.roomInfo.gameList[props.playerIndex].score
        - Gang[index].value * state.roomInfo.multiples
      for (let i = 0; i < state.roomInfo.gameList.length; i++) {
        if (i !== props.playerIndex) {
          state.roomInfo.gameList[i].score
            = state.roomInfo.gameList[i].score + Gang[index].value * state.roomInfo.multiples
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped></style>
