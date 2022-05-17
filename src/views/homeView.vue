<template>
  <div class="home text-center">
    <p class="mg10 mg-b0 text-color time">{{ time }}</p>
    <search class="search-area" shape="round" @search="onSearch"
            v-model="filter.key" placeholder="请输入搜索关键词"/>
    <dropdown-menu>
      <dropdown-item v-model="value" :options="option" @change="changeMenu"/>
    </dropdown-menu>
    <div class="info-container">
      <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <Row>
          <Col span="8" v-for="(item,index) in list" :key="index">
            <van-image
                height="180"
                :src="item.cover"
            />
          </Col>
        </Row>
      </List>

    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import {defineComponent, ref} from "vue";
import {getVideoInfo} from "@/api/apis";
import {Search, DropdownMenu, DropdownItem, Row, Col, List, Image as VanImage} from "vant";

export default defineComponent({
  name: "HomePgae",
  components: {
    Search,
    DropdownMenu,
    DropdownItem,
    Col,
    Row,
    List,
    VanImage
  },
  setup() {
    const time = ref('')
    const timer = ref(0)
    const list = ref<any[]>([])
    const loading = ref(false)
    const finished = ref(false)
    const value = ref('title')
    const filter = ref({
      option: 'title',
      key: '',
      current: 1,
      size: 10
    })
    const option = ref([
      {text: '标题名称', value: 'title'},
      {text: '导演名称', value: 'director'},
      {text: '主演名称', value: 'actor'},
      {text: '地区名称', value: 'region'},
      {text: '上映时间', value: 'releaseTime'},
      {text: '分类名称', value: 'videoType'},
    ])
    const getVideo = async () => {
      loading.value = true
      try{
        const res = await getVideoInfo(filter.value)
        if(res){
          list.value.push(...res)
          loading.value = false
        }else{
          finished.value=true
        }
      }catch (e) {
        console.warn(e)
      }

    };
    const changeMenu = () => {
      filter.value.key = ''
    };
    const onSearch = () => {
      list.value=[]
      filter.value.current=1
      if(loading.value)return
      getVideo()
    };
    const onLoad = () => {
        filter.value.current += 1
        getVideo()
    };
    const initTime = () => {
      time.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
      timer.value = setInterval(() => {
        time.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }, 1000)
    };
    return {
      time,
      timer,
      list,
      loading,
      finished,
      value,
      option,
      filter,
      onSearch,
      onLoad,
      changeMenu,
      initTime
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

<style lang="stylus" scoped>
.home {
  --van-dropdown-menu-height: 0.66rem;
  --van-dropdown-menu-title-font-size: 13px;
  .time{

  }
  .info-container{
    margin-top:0.2rem;
    height:100vh
    overflow auto;
  }
}
</style>
