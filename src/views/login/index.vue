<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="formInline"
      :rules="rules"
    >
      <img class="logo" src="@/assets/common/logo.png" alt="">
      <div class="title-container">
        <el-form-item prop="loginName">
          <span class="svg-container el-icon-mobile" />
          <!-- 手机输入框 -->
          <el-input v-model="formInline.loginName" />
        </el-form-item>
        <!-- 密码item框 -->
        <el-form-item prop="password">
          <!-- <span class="svg-container el-icon-user-solid" /> -->
          <!-- 手机图标 -->
          <span class="svg-container el-icon-lock" />
          <el-input ref="pwd" v-model="formInline.password" :type="isShowPassword==='password'? 'password' : ''" />
          <span @click="changeEye">
            <svg-icon :icon-class="isShowPassword==='password' ? 'eye' : 'eye-open'" />
          </span>
        <!-- <span class="svg-container el-icon-user-solid" /> -->
        </el-form-item>
        <!-- 验证码 -->
        <div style="display:flex">
          <!-- item每一项 -->
          <el-form-item style="flex:3" prop="code">
            <!-- <span class="svg-container el-icon-user-solid" /> -->

            <span
              class="svg-container el-icon-s-tools"
            />
            <!-- 输入框 -->
            <el-input v-model="formInline.code" type="type" placeholder="输入验证码" />

          <!-- <span class="svg-container el-icon-user-solid" /> -->
          </el-form-item>
          <div style="height:50px;flex:1" @click="getCode()">
            <img :src="imgUrl">
          </div>
        </div>
      </div>

      <el-button v-loading="loading" class="loginBtn" @click="getLogin">登录</el-button>
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      // 表单对象
      formInline: {
        loginName: 'admin',
        password: 'admin',
        clientToken: '',
        loginType: 0,
        code: ''
      },
      loading: false,
      // 密码狂状态切换
      isShowPassword: 'password',
      // 验证码图片
      imgUrl: '',
      // 规则验证
      rules: {
        loginName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 5, max: 11, message: '账号格式不对', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 11, message: '密码格式不对', trigger: 'blur' }

        ],
        code: [
          { min: 4, max: 4, message: '验证码格式不对', trigger: 'blur' },
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    // 获得验证码
    async   getCode() {
      this.formInline.clientToken = Math.floor(Math.random() * 32)
      await this.$store.dispatch('user/setCode', this.formInline.clientToken)
      this.imgUrl = window.URL.createObjectURL(this.$store.state.user.code)
      console.log(11, this.imgUrl)
    },
    // 眼睛的点击事件
    changeEye() {
      this.isShowPassword === 'password' ? this.isShowPassword = '' : this.isShowPassword = 'password'
      // 数据更新完会执行
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    // 登录按钮点击
    async getLogin() {
      try {
        this.loading = true
        await this.$store.dispatch('user/setLogin', this.formInline)
        if (this.$store.state.user.message.success) {
          this.$router.push('/dashboard')
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
        } else {
          this.$message.error(this.$store.state.user.message.msg)
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #ccc;
      height: 47px;
      caret-color: #ccc;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }

  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:#fff;
    border:1px solid #ccc;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url(~@/assets/common/background.png) no-repeat  0 0 /cover;
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 50%;
    left:50%;
    margin-top: -(195px);
    margin-left: -(260px);
    width: 520px;
    height: 390px;
    padding: 76px 35px 0;
    // margin: 0 auto;
    border-radius: 10px;
    // overflow: hidden;
    background-color: #fff;
  }
  .logo{
    position: absolute;
    top:-48px;
    left: 50%;
    margin-left: -48px;
    width: 96px;
    height: 96px;

  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  // 登录按钮
  .el-button {
      width: 100%;
      height: 50px;
      background-color: #5c6aec;
      color: #fff;
    }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
