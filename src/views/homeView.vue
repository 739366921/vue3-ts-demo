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
          <Col span="8" v-for="(item,index) in list" :key="index" @click="toVideoDetail(item.videoId)">
            <van-image
                height="180"
                :src="item.cover"
                radius="8"
            />
            <p style="text-align: left;padding-left: 10px;font-weight: bold;font-size:16px;">{{item.title}}</p>
            <p style="text-align: left;padding-left: 10px;font-size:14px;">{{item.videoType}}</p>
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
import { useRouter } from "vue-router";
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
    const router=useRouter()
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
        if(res.data){
          list.value=list.value.concat(res.data)
          loading.value = false
        }else{
          finished.value=true
        }
      }catch (e) {
        console.warn(e)
      }finally{
        loading.value = false
      }
    };
    const changeMenu = () => {
      filter.value.key = ''
    };
    const onSearch = () => {
      list.value=[]
      filter.value.current=1
      finished.value=false
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
    const toVideoDetail=(videoId:string)=>{
      router.push({
        path:'/video/detail',
        query:{
          videoId:videoId
        }
      })
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
      initTime,
      toVideoDetail
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
    overflow auto;
    height:76.5vh;
  }
}
</style>
