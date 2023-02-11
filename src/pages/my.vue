<!--
 * @Author: Nic
 * @Date: 2022-06-26 11:04:33
 * @LastEditTime: 2023-02-07 20:58:39
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/src/pages/my.vue
-->
<template>
  <div overflow-y-auto h-screen>
    <div p-t-5 p-l-5 mb-20px text-main text-2xl text=" gray-700 dark:gray-200">
      创建规则
    </div>
    <van-form ref="refVanForm" @submit="onSubmit" @failed="onFailed">
      <div>
        <van-cell-group inset>
          <van-field
            v-model="state.ruleName"
            name="ruleName"
            label="规则名称"
            placeholder="请输入规则名称"
            :rules="[{ required: true, message: '请填写规则名称' }]"
          />
        </van-cell-group>
      </div>
      <div p-t-4 p-l-5 text-main text=" gray-700 dark:gray-200">
        和牌类型
      </div>
      <div v-for="(v, index) in state.Scoring" :key="index" mt-10px>
        <van-cell-group inset class="inputPos">
          <van-field
            v-model="v.name"
            :name="`Scoring${index}`"
            label="名称"
            placeholder="请输入名称"
            :rules="[{ required: true, message: '请填写名称' }]"
          />
          <van-field :name="`stepper${index}`" label="步进器">
            <template #input>
              <div flex>
                <van-stepper
                  v-model="v.value"
                  :min="1"
                  name="value"
                  label="分值"
                  placeholder="请输入分值"
                />
                <SvgIcon class="inputDel" name="del" w-20px h-20px />
              </div>
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div flex justify-center>
        <button mt-20px btn-main flex items-center @click="addRule('Scoring')">
          <SvgIcon name="add" w-15px h-15px pr-4px mt--.2 />
          <div>添加规则</div>
        </button>
      </div>
      <div p-l-5 text-main text=" gray-700 dark:gray-200">
        额外规则
      </div>
      <div v-for="(v, index) in state.Gang" :key="v.name + index" mt-10px>
        <van-cell-group inset class="inputPos">
          <van-field
            v-model="v.name"
            :name="`Gang${index}`"
            label="名称"
            placeholder="请输入名称"
            :rules="[{ required: true, message: '请填写名称' }]"
          />
          <van-field name="stepper" label="分值">
            <template #input>
              <div flex>
                <van-stepper v-model="v.value" name="分值" label="分值" placeholder="请输入分值" />
                <SvgIcon class="inputDel" name="del" w-20px h-20px />
              </div>
            </template>
          </van-field>
        </van-cell-group>
      </div>

      <div flex justify-center>
        <button mt-20px btn-main flex items-center @click="addRule('Gang')">
          <SvgIcon name="add" w-15px h-15px pr-4px mt--.2 />
          <div>添加规则</div>
        </button>
      </div>
      <button mt-20px mb-20px btn-main native-type="submit">
        提交
      </button>
      <!-- <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div> -->
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { showNotify } from 'vant'
// const vanForm = ref()
const refVanForm: any = ref(null)
const state = reactive({
  ruleName: '天津麻将',
  Scoring: [
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
  ],
  Gang: [
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
  ],
})
const addRule = (type: string) => {
  console.log('type', type)
  if (type === 'Scoring') {
    state.Scoring.push({
      name: '',
      value: 1,
      flag: false,
    })
  }
  else {
    state.Gang.push({
      name: '',
      value: 1,
      flag: false,
    })
  }
}
const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
  showNotify({ type: 'danger', message: '请填写完整！' })
  refVanForm.value.scrollToField(errorInfo.errors[0].name)
}
const onSubmit = async () => {
  console.log('state', state)

  const ruleList = new AV.Object('RuleList')
  ruleList.set('RuleName', state.ruleName)
  ruleList.set('Scoring', state.Scoring)
  ruleList.set('Gang', state.Gang)
  const ruleListRes = await ruleList.save()
  console.log('ruleListRes', ruleListRes.id)

  // ruleList.save().then((res: any) => {
  // // 成功保存之后，执行其他逻辑
  //   console.log(`保存成功。objectId：${res.id}`)
  // }, (error: any) => {
  // // 异常处理
  //   console.log('error', error)
  // })

  // object1.set('content', '更新文档')
  // const object2 = new AV.Object('Todo')
  // object2.set('content', '回复论坛帖子')
  // const objects = [object1, object2]

  // // 批量构建和更新
  // AV.Object.saveAll(objects).then(
  //   (savedObjects) => {
  //   // 成功保存所有对象时进入此 resolve 函数，savedObjects 是包含所有 AV.Object 的数组
  //   },
  //   (error) => {
  //   // 只要有一个对象保存错误就会进入此 reject 函数
  //   console.log('error', error)
  //   },
  // )
}
</script>

<route lang="yaml">
meta:
  layout: home
  </route>

<style lang="scss" scoped>
.inputPos {
  position: relative;
  .inputDel {
    position: absolute;
    top: 4px;
    right: 0;
  }
}
</style>
