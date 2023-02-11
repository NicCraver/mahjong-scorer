<template>
  <div h-screen>
    <header pl-10 pt-10>
      <p text="4xl left">
        Mahjong
      </p>
      <p text="4xl left" pt-2>
        <span>Scoring</span>
        <span pl-4>Device</span>
      </p>
    </header>
    <LoginSignup ref="LoginSignupRef">
      <template #login>
        <div px-8 pt-8>
          <div>
            <p text-main text-8>
              登录
            </p>
            <p text-6 text-left text-gray-500 dark:text-gray-300 font-medium pb-3 pl-1 pt-1>
              Log in
            </p>
          </div>
          <div class="user-box">
            <input v-model="loginForm.userName" type="text" name="" required border-b-1 b-gray-500 dark:b-gray-300>
            <label>用户名</label>
          </div>
          <div class="user-box">
            <input v-model="loginForm.passWord" type="password" name="" required border-b-1 b-gray-500 dark:b-gray-300>
            <label>密码</label>
          </div>
          <button btn-main w-30 @click="onLogin()">
            登录
          </button>
          <div relative pl-2 text-gray-500 dark:text-gray-300>
            <div class="login-text" absolute @click="checkboxChange()">
              前往注册
            </div>
          </div>
          <Footer />
        </div>
      </template>
      <template #signup>
        <div px-8 pt-8>
          <div>
            <p text-main text-8>
              注册
            </p>
            <p text-6 text-left text-gray-500 dark:text-gray-300 font-medium pb-3 pl-1 pt-1>
              Sign up
            </p>
          </div>
          <van-swipe h-90px @change="onChange">
            <van-swipe-item v-for="(v, index) in avatarList" :key="index">
              <div w-60px h-60px text-center m-auto>
                <SvgIcon :name="v.name" w-60px h-60px />
              </div>
            </van-swipe-item>
          </van-swipe>
          <div class="user-box">
            <input v-model="signupForm.nickName" type="text" name="" required border-b-1 b-gray-500 dark:b-gray-300>
            <label>昵称</label>
          </div>
          <div class="user-box">
            <input v-model="signupForm.userName" type="text" name="" required border-b-1 b-gray-500 dark:b-gray-300>
            <label>用户名</label>
          </div>
          <div class="user-box">
            <input v-model="signupForm.passWord" type="password" name="" required border-b-1 b-gray-500 dark:b-gray-300>
            <label>密码</label>
          </div>
          <button btn-main w-30 @click="onSignup()">
            注册并登录
          </button>
          <div relative pl-2 text-gray-500 dark:text-gray-300>
            <div class="login-text" absolute @click="checkboxChange()">
              前往登录
            </div>
          </div>
          <Footer />
        </div>
      </template>
    </LoginSignup>
  </div>
</template>

<script lang="ts" setup>
// import AV from 'leancloud-storage/live-query'
import { showNotify } from 'vant'
import { mainStore } from '~/store'
const indexStore = mainStore()
const { avatarList } = storeToRefs(indexStore)
const LoginSignupRef = $ref<any>(null)
const router = useRouter()

const loginForm = reactive({
  userName: '',
  passWord: '',
})

const signupForm = reactive({
  avatarName: avatarList.value[0].name,
  nickName: '',
  userName: '',
  passWord: '',
})

onMounted(() => {
  indexStore.$reset()
})
const checkboxChange = () => {
  LoginSignupRef?.checkboxChange()
}

const onChange = (e: any) => {
  signupForm.avatarName = avatarList.value[e].name
}

const onAVLogin = () => {
  const query = new AV.Query('Player')
  query.equalTo('userName', loginForm.userName)
  query
    .find()
    .then((res: any) => {
      // students 是包含满足条件的 Student 对象的数组
      if (res.length === 0)
        showNotify({ type: 'danger', message: '该用户未注册，请前往注册！' })
      signupForm.userName = loginForm.userName
      signupForm.passWord = loginForm.passWord
      if (res[0]._serverData.passWord !== loginForm.passWord)
        showNotify({ type: 'danger', message: '密码错误，请重试或询问管理员！' })
      showNotify({ type: 'success', message: '登陆成功！' })
      indexStore.saveInfo({
        ...res[0]._serverData,
        userID: res[0].id,
      })
      router.push('/')
    })
    .catch((error: any) => {
      console.error('error', error)
    })
}
const onAVSignup = () => {
  const Players = AV.Object.extend('Player')
  // 构建对象
  const player = new Players()
  // 为属性赋值
  player.set('avatarName', signupForm.avatarName)
  player.set('nickName', signupForm.nickName)
  player.set('userName', signupForm.userName)
  player.set('passWord', signupForm.passWord)
  // 将对象保存到云端
  player.save().then(
    (res: any) => {
      showNotify({ type: 'success', message: '注册成功！' })
      loginForm.userName = signupForm.userName
      loginForm.passWord = signupForm.passWord
      onAVLogin()
    },
    (error: any) => {
      // 异常处理
      console.error('error', error)
    },
  )
}
const onLogin = () => {
  if (loginForm.userName === '') {
    showNotify({ type: 'danger', message: '请输入用户名！' })
    return
  }
  if (loginForm.passWord === '') {
    showNotify({ type: 'danger', message: '请输入密码！' })
    return
  }
  onAVLogin()
}
const onSignup = () => {
  if (signupForm.nickName === '') {
    showNotify({ type: 'danger', message: '请输入昵称！' })
    return
  }
  if (signupForm.userName === '') {
    showNotify({ type: 'danger', message: '请输入用户名！' })
    return
  }
  if (signupForm.passWord === '') {
    showNotify({ type: 'danger', message: '请输入密码！' })
    return
  }
  const query = new AV.Query('Player')
  query.equalTo('userName', signupForm.userName)
  query
    .find()
    .then((res: any) => {
      // students 是包含满足条件的 Student 对象的数组
      if (res.length === 0)
        onAVSignup()
      else
        showNotify({ type: 'danger', message: '该用户已注册！' })
    })
    .catch((error: any) => {
      console.error('error', error)
    })
  // console.log('signupForm', signupForm)
}
</script>

<style lang="scss" scoped>
.user-box {
  position: relative;
}

.user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  margin-bottom: 30px;
  // border: none;
  // border-bottom: 1px solid #000;
  outline: none;
  background: transparent;
}

.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 14px;
  pointer-events: none;
  transition: 0.3s;
}

.user-box input:focus~label,
.user-box input:valid~label {
  top: -20px;
  left: 0;
  // color: #03e9f4;
  font-size: 12px;
}

.login-text {
  line-height: 20px;
  font-size: 14px;
  bottom: 0;
  right: 0;
  width: 60px;
}
</style>
