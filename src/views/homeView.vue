<template>
  <div class="home text-center">
    <p class="mg10 mg-b0 text-color">{{ time }}</p>
    <search class="search-area" shape="round" @search="onSearch"
            v-model="filter.key" placeholder="请输入搜索关键词"/>
    <dropdown-menu>
      <dropdown-item v-model="value" :options="option" @change="changeMenu"/>
    </dropdown-menu>
    
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import {defineComponent, ref} from "vue";
// import VideoInfoApi from "/src/api/apis";
import {getVideoInfo} from "@/api/apis";
import {Search, DropdownMenu, DropdownItem} from "vant";

export default defineComponent({
  name: "HomePgae",
  components: {
    Search,
    DropdownMenu,
    DropdownItem
  },
  data() {
    return {
      direction: "top",
      pinPadding: 0,
      time: "",
      timer: 0,
      color: "red",
      city: ["", "", ""]
    };
  },
  methods: {
    initTime() {
      this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.timer = setInterval(() => {
        this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
    },
    changeMenu() {
      this.filter.key = ''
    }
  },
  setup() {
    const value = ref('title');
    const filter={
      option: 'title',
      key: '',
      current: 1,
      size: 10
    };
    const option = [
      {text: '标题名称', value: 'title'},
      {text: '导演名称', value: 'director'},
      {text: '主演名称', value: 'actor'},
      {text: '地区名称', value: 'region'},
      {text: '上映时间', value: 'releaseTime'},
      {text: '分类名称', value: 'videoType'},
    ];
  const getVideo= async function getVideoImage() {
      const res = await getVideoInfo(filter)
      console.log('res', res)
    };
    const onSearch = () => {
      getVideo()
    };
    return {
      value,
      option,
      filter,
      onSearch
    }
  },
  created() {
    this.initTime();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
});
</script>

<style scoped>
.home {
  --van-dropdown-menu-height:0.66rem;
  --van-dropdown-menu-title-font-size:13px;
}
</style>
