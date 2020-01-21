<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />

      <a-menu
        theme="dark"
        mode="inline"
        @click="handleClickMenu"
        :defaultSelectedKeys="activeMenu"
      >
        <a-menu-item key="/home">
          <a-icon type="home" />
          <span>首页</span>
        </a-menu-item>

        <template v-for="item in menusList">
          <a-menu-item :key="item.path" v-if="!item.children">
            <i class="iconfont menuIcon" v-html="item.meta.icon" />
            <span>{{ item.name }}</span>
          </a-menu-item>

          <a-sub-menu v-else :key="item.path" >
            <span slot="title">
              <i class="iconfont menuIcon" v-html="item.meta.icon" />
              <span>{{ item.name }}</span>
            </span>
            <a-menu-item
              v-for="sub_item in item.children"
              :key="sub_item.path"
              >
                <i class="iconfont menuIcon" v-html="sub_item.meta.icon" />
                <span>{{ sub_item.name }}</span>
            </a-menu-item>
          </a-sub-menu>

        </template>

      </a-menu>

    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>

      <a-layout-content style="margin: 24px 16px 24px 16px; padding: 24px;background: #fff">
        <div id="single-vue" class="single-spa-vue">
          <div id="vue"></div>
        </div>
        <router-view :key="$route.path" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      menusList: [],
    };
  },
  computed: {
    activeMenu() {
      return ['/home'];
    },
  },
  created() {
    this.menusList = this.$store.state.user.permissions;
    console.log(this.$route);
  },
  mounted() {
  },
  methods: {
    handleClickMenu(e) {
      const route = e.keyPath.reverse().join('/');
      this.$router.push(route);
    },
  },
};
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.menuIcon{
  margin-right:10px;
  font-size:14px;
}
</style>
