<template>
  <div class="container">
    <a-card
      hoverable
      class="formBox"
    >
      <h3>登 录</h3>
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input
            :placeholder="placeholder1"
            class="input"
            @focus="placeholder1 = ''"
            @blur="placeholder1 = '请输入用户名'"
            v-decorator="[
              'userName',
              { rules: [{required: true, message: 'Please input your userName'}]}
            ]"
          >
            <a-icon
              slot="prefix"
              type="user"
              class="prefix"
            />
          </a-input>
        </a-form-item>

        <a-form-item label="密码">
          <a-input
            :placeholder="placeholder2"
            @focus="placeholder2 = ''"
            @blur="placeholder2 = '请输入密码'"
            class="input"
            v-decorator="[
              'passWord',
              { rules: [{required: true, message: 'Please input your passWord'}]}
            ]"
            type="password"
          >
            <a-icon
              theme='filled'
              slot="prefix"
              type="lock"
              class="prefix"
            />
          </a-input>
        </a-form-item>

        <a-button
          class="fr"
          type="link"
        >忘记密码?</a-button>

        <div
          class="button"
          type="primary"
          @click="handleSubmit"
        >
          <span class="buttontext">登录</span>
          <div class="buttonbg"></div>
        </div>
      </a-form>
      <div class="register">
        <a-button type="link">立即注册</a-button>
      </div>
    </a-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    placeholder1: '请输入用户名',
    placeholder2: '请输入密码',
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login' });
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err) => {
        if (!err) {
          const form = this.form.getFieldsValue();
          this.$store.dispatch('GetInfo', form)
            .then((res) => {
              const myRouter = res.map(item => ({ ...item, component: () => import('@/views/layout') }));
              myRouter.push({ path: '*', redirect: '/404' });
              this.$router.addRoutes(myRouter);
              this.$router.push('/');
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: url("~@/assets/login_image/bg.jpg") center center no-repeat;
  background-size: cover;
  height: 100%;
  @include itemMiddle;
  .formBox {
    /deep/ .ant-card-body {
      padding: 65px 55px 54px 55px;
      cursor: auto;
    }
    width: 500px;
    border-radius: 5px;
    /deep/ .ant-input-affix-wrapper .ant-input {
      border: none;
      border-bottom: 1px solid white !important;
      box-shadow: none;
      position: relative;
    }
    h3 {
      font-size: 38px;
      color: #333;
      text-align: center;
      margin: 0;
      padding-bottom: 50px;
    }
  }
  .input {
    border-bottom: 2px solid #d9d9d9;
    &::after {
      position: absolute;
      content: "";
      display: block;
      height: 2px;
      width: 0%;
      transition: all 0.8s;
    }
  }
  .register {
    margin: 10px auto;
    text-align: center;
  }
  .input:focus-within {
    .prefix {
      color: purple;
    }
    &::after {
      width: 100%;
      background-color: #7f7f7f;
    }
  }
  .button {
    cursor: pointer;
    border-radius: 25px;
    @include itemMiddle;
    position: relative;
    width: 390px;
    height: 50px;
    overflow: hidden;
    padding: 0;
    margin: 0;
    border: none;
    &:hover {
      .buttonbg {
        transform: translateX(-50%);
      }
    }
  }
  .buttonbg {
    transition: all 0.5s;
    /* autoprefixer: ignore next */
    background: -webkit-linear-gradient(
      to right,
      #00dbde,
      #fc00ff,
      #00dbde,
      #fc00ff
    );
    background: -moz-linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
    background: -o-linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
    background: linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
    top: 0;
    left: 0;
    height: 100%;
    width: 300%;
    position: absolute;
  }
  .buttontext {
    position: absolute;
    z-index: 2;
    line-height: 50px;
    color: white;
  }
  .register {
    @include itemMiddle;
  }
}
</style>
