import {defineComponent, ref, reactive, computed, onUnmounted, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import {NavBar, Button, Switch} from "vant";
import {getVideoDetail} from "@/api/apis";

export default defineComponent({
    setup() {
        const router = useRouter()
        const route = useRoute()
        const routerBack = () => {
            router.back()
        }
        const videoDetail = async () => {
            const videoId:string=route.query.videoId
            try {
                const res = await getVideoDetail(videoId)
                console.log(res)
            } catch (e) {
                console.warn(e)
            }
        }
        return () => (
            <div style="background:#f7f8fa;min-height:100vh">
                <NavBar fixed title="资源详情" left-text="返回" left-arrow onClick-left={routerBack}/>
                <Button type="danger" round block onClick={videoDetail}/>
                <Button type="danger" round block onClick={videoDetail}>测试</Button>
            </div>
        );
    }
})
