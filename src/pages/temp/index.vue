<script lang="ts" setup>
const username = $ref('')
const LoginSignupRef = $ref<any>(null)
const login = () => {}
const checkboxChange = () => {
  LoginSignupRef?.checkboxChange()
}
</script>

<template>
  <LoginSignup ref="LoginSignupRef">
    <template #login>
      <div px-10 pt-10>
        <div p-2>
          <p text-main text-8>登录</p>
          <p text-6 text-left text-gray-500 dark:text-gray-300 font-medium pb-3 pl-1 pt-1>Log in</p>
        </div>
        <div class="user-box">
          <input type="text" name="" required border-b-1 b-gray-500 dark:b-gray-300 />
          <label>用户名</label>
        </div>
        <div class="user-box">
          <input
            v-model="username"
            type="password"
            name=""
            required
            border-b-1
            b-gray-500
            dark:b-gray-300
          />
          <label>密码</label>
        </div>
        <button btn-main w-30 @click="login()">登录</button>
        <div relative pl-2 text-gray-500 dark:text-gray-300>
          <div class="login-text" absolute @click="checkboxChange()">前往注册</div>
        </div>
        <Footer />
      </div>
    </template>
    <template #signup>
      <div px-10 pt-10>
        <div p-2>
          <p text-main text-8>注册</p>
          <p text-6 text-left text-gray-500 dark:text-gray-300 font-medium pb-3 pl-1 pt-1>
            Sign up
          </p>
        </div>
        <div class="user-box">
          <input type="text" name="" required border-b-1 b-gray-500 dark:b-gray-300 />
          <label>用户名</label>
        </div>
        <div class="user-box">
          <input
            v-model="username"
            type="password"
            name=""
            required
            border-b-1
            b-gray-500
            dark:b-gray-300
          />
          <label>密码</label>
        </div>
        <button btn-main w-30 @click="login()">注册并登录</button>
        <div relative pl-2 text-gray-500 dark:text-gray-300>
          <div class="login-text" absolute @click="checkboxChange()">前往登录</div>
        </div>
        <Footer />
      </div>
    </template>
  </LoginSignup>
</template>

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

.user-box input:focus ~ label,
.user-box input:valid ~ label {
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
