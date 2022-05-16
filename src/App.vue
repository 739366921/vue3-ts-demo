<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Tabbar placeholder route v-show="showFooter">
      <TabbarItem icon="home-o" replace to="/">首页</TabbarItem>
      <TabbarItem icon="search" replace to="/about">搜索</TabbarItem>
      <TabbarItem icon="star-o" replace to="/todoList">收藏</TabbarItem>
      <TabbarItem icon="user-o" replace to="/luckdraw">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Tabbar, TabbarItem } from "vant";

export default defineComponent({
  name: "App",
  components: {
    Tabbar,
    TabbarItem,
  },
  computed: {
    showFooter() {
      return this.$route.path.split("/").length < 3;
    },
  }
})
</script>
