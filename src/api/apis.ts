import httpRequest from '@/request/index'

// 定义接口的传参
interface VideoInfoParam {
    option: string,
    key: string,
    current: number,
    size: number
}
// 定义接口的传参
interface VideoDetailParam {
    videoId: string,
}
// 获取电影集信息
export function getVideoInfo(param: VideoInfoParam) {
    return httpRequest({
        url: `/video/search/${param.option}/${param.key}/${param.current}/${param.size}`,
        method: 'get'
    })
}
// 获取电影详细信息
export function getVideoDetail(param: VideoDetailParam) {
    return httpRequest({
        url: `/videoChapter/search/${param.videoId}`,
        method: 'get'
    })
}
