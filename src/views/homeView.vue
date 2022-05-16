<template>
  <div class="home text-center">
    <p class="mg20 text-color">{{ time }}</p>

  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import {defineComponent} from "vue";
// import VideoInfoApi from "/src/api/apis";
import {getVideoInfo} from "@/api/apis";
// import { Dialog } from "vant";

export default defineComponent({
  name: "HomePgae",
  components: {},
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
        key: 'hero',
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
