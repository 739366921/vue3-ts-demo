import {defineComponent, ref, onMounted, onUnmounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import {NavBar, Button, Row, Col} from "vant";
import {getVideoDetail} from "@/api/apis";
import '@/assets/css/videoDetail.styl';
import 'videojs-contrib-hls';
import videojs from 'video.js';

export default defineComponent({
    setup() {
        const textUrl = ref('https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8')
        const videoList = ref<any[]>([])
        const videoUrl = ref<string>('')
        const videoIndex = ref<number>(0)
        const playerObj = ref<any>()
        const router = useRouter()
        const route = useRoute()
        const routerBack = () => {
            router.back()
        }
        const videoDetail = async () => {
            const videoId = {videoId: route.query.videoId as string}
            try {
                const res = ref<any>(await getVideoDetail(videoId))
                if (res.value.msg === '成功') {
                    videoList.value = res.value.data.chapterList
                    videoUrl.value = videoList.value[0].chapterPath
                }
            } catch (e) {
                console.warn(e)
            }
        }
        const setVideoObj = () => {
            console.log(33333,videoUrl.value)
            playerObj.value = videojs('video', {
                controls: true,
                preload: 'auto',
                autoplay: 'muted', // 实现视频自动播放的关键
                sources: videoUrl.value as string,
                hls: {
                    withCredentials: true
                }
            })
            playerObj.value.play()
        }
        const getVideo = (item: any, index: number) => {
            videoUrl.value = item.chapterPath
            videoIndex.value = index
            playerObj.value.src(videoUrl.value)
        }
        onMounted(async () => {
            await videoDetail()
            setVideoObj()
        })
        onUnmounted(() => {
            playerObj.value.dispose()
        })
        return () => (
            <div style="background:#f7f8fa;min-height:100vh">
                <NavBar fixed title="资源详情" left-text="返回" left-arrow onClick-left={routerBack}/>
                <div style='height:var(--van-nav-bar-height);'/>
                <div>
                    <video id="video" class="video-js" style='width:100%;height:5rem'></video>
                    <div class='button-list'>
                        <Row style='margin-bottom:0.5rem;'>
                            {videoList.value.map(
                                (item: any, index: number) => {
                                    return (
                                        <Col span="4">
                                            <Button type={videoIndex.value === index ? 'success' : 'primary'}
                                                    size='small' plain disabled={videoIndex.value === index}
                                                    onClick={() => getVideo(item, index)}>{item.title}</Button>
                                        </Col>
                                    )
                                }
                            )}
                        </Row>

                    </div>
                </div>
            </div>
        );
    }
})
