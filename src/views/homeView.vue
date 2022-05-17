<template>
  <div class="home text-center">
    <p class="mg20 text-color">{{ time }}</p>
    <Row>
      <Col span="8">span: 8</Col>
      <Col span="8">span: 8</Col>
      <Col span="8">span: 8</Col>
    </Row>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import {defineComponent} from "vue";
// import VideoInfoApi from "/src/api/apis";
import {getVideoInfo} from "@/api/apis";
import { Col,Row } from "vant";

export default defineComponent({
  name: "HomePgae",
  components: {
    Col,
    Row
  },
  data() {
    return {
      direction: "top",
      pinPadding: 0,
      time: "",
      timer: 0,
      color: "red",
      city: ["", "", ""],
      filter: {
        option: 'title',
        key: '蜡笔小新',
        current: 1,
        size: 10
      }
    };
  },
  methods: {
    initTime() {
      this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.timer = setInterval(() => {
        this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
    },
    async getVideoImage() {
      const res = await getVideoInfo(this.filter)
      console.log('res', res)
    }
  },
  created() {
    this.initTime();
  },
  async mounted() {
    await this.getVideoImage()
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
});
</script>

<style>
.text-color {
}
</style>
